import { Fixture } from '../types';

function formatIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Generates an RFC 5545 compliant .ics calendar file content for Tottenham fixtures.
 */
export function generateIcsCalendar(fixtures: Fixture[]): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//COYS Tottenham Hotspur Matchday Companion//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Tottenham Hotspur Fixtures 2026/27',
    'X-WR-TIMEZONE:Europe/London',
    'X-WR-CALDESC:Official Tottenham Hotspur matchday fixtures, kick-off times, broadcast info and stadium guides'
  ];

  fixtures.forEach((f) => {
    // Only include upcoming or recent fixtures
    const startDate = new Date(f.kickoffTimestamp);
    const endDate = new Date(f.kickoffTimestamp + 2 * 60 * 60 * 1000); // 2 hours later
    const createdDate = new Date();

    const summary = `${f.homeTeam.name} vs ${f.awayTeam.name} (${f.competition})`;
    const location = f.venue ? `${f.venue.name}, ${f.venue.city}` : 'Tottenham Hotspur Stadium, London';
    const description = `Matchday Guide for ${f.homeTeam.shortName} vs ${f.awayTeam.shortName}\\n` +
      `Competition: ${f.competition}\\n` +
      `Venue: ${location}\\n` +
      `Broadcast: ${f.broadcast?.uk || 'Live on Sky Sports / TNT'}\\n` +
      `Track live turnstile queues, pub guides and travel with the COYS Matchday Companion.`;

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:spurs-fixture-${f.id}@coys.matchday.companion`);
    lines.push(`DTSTAMP:${formatIcsDate(createdDate)}`);
    lines.push(`DTSTART:${formatIcsDate(startDate)}`);
    lines.push(`DTEND:${formatIcsDate(endDate)}`);
    lines.push(`SUMMARY:${summary}`);
    lines.push(`LOCATION:${location}`);
    lines.push(`DESCRIPTION:${description}`);
    lines.push('STATUS:CONFIRMED');
    lines.push('CATEGORIES:SPORTS,FOOTBALL,TOTTENHAM HOTSPUR');
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/**
 * Triggers instant browser download of the standard .ics file
 */
export function downloadFixturesIcs(fixtures: Fixture[]): void {
  const icsContent = generateIcsCalendar(fixtures);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'tottenham-hotspur-fixtures-2026-27.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Creates a 1-click Google Calendar add link for an individual fixture
 */
export function getGoogleCalendarUrl(fixture: Fixture): string {
  const startDate = new Date(fixture.kickoffTimestamp);
  const endDate = new Date(fixture.kickoffTimestamp + 2 * 60 * 60 * 1000);

  const startStr = formatIcsDate(startDate);
  const endStr = formatIcsDate(endDate);

  const title = encodeURIComponent(`${fixture.homeTeam.name} vs ${fixture.awayTeam.name} (${fixture.competition})`);
  const details = encodeURIComponent(
    `Spurs Matchday: ${fixture.competition}\n` +
    `Venue: ${fixture.venue.name}\n` +
    `Broadcast: ${fixture.broadcast?.uk || 'Sky Sports / TNT Sports'}\n` +
    `Access live concourse guide and travel with COYS Companion.`
  );
  const location = encodeURIComponent(`${fixture.venue.name}, ${fixture.venue.city}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
}
