import React, { useState } from 'react';
import { 
  Trophy, 
  MessageSquare, 
  Heart, 
  Send, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Lock, 
  Unlock,
  Users
} from 'lucide-react';
import { INITIAL_MOTM_CANDIDATES, INITIAL_FAN_WALL_POSTS } from '../data/fanWallData';
import { MotmCandidate, FanWallPost } from '../types';

interface FanWallMotmProps {
  currentMinute?: number;
  matchStatus?: string;
  opponent?: string;
}

export const FanWallMotm: React.FC<FanWallMotmProps> = ({
  currentMinute = 78,
  matchStatus = 'LIVE',
  opponent = 'Manchester United'
}) => {
  const [candidates, setCandidates] = useState<MotmCandidate[]>(INITIAL_MOTM_CANDIDATES);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [posts, setPosts] = useState<FanWallPost[]>(INITIAL_FAN_WALL_POSTS);
  const [newPostText, setNewPostText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'motm' | 'wall'>('motm');

  // Simulated 75th minute unlock toggle for demonstration
  const [forceUnlock, setForceUnlock] = useState<boolean>(true);
  const isUnlocked = forceUnlock || (matchStatus === 'LIVE' && currentMinute >= 75) || matchStatus === 'FINISHED';

  const handleVote = (candidateId: string) => {
    if (hasVoted) return;

    setSelectedCandidateId(candidateId);
    setHasVoted(true);

    // Update vote counts
    const updated = candidates.map(c => {
      if (c.id === candidateId) {
        return { ...c, votes: c.votes + 1 };
      }
      return c;
    });

    const totalVotes = updated.reduce((sum, c) => sum + c.votes, 0);
    const withPercentages = updated.map(c => ({
      ...c,
      percentage: Math.round((c.votes / totalVotes) * 100)
    }));

    setCandidates(withPercentages);

    // Add a vote confirmation post to the fan wall
    const votedPlayer = candidates.find(c => c.id === candidateId);
    if (votedPlayer) {
      const votePost: FanWallPost = {
        id: 'fwp_' + Date.now(),
        author: 'You (Supporter)',
        badge: 'Official Voter',
        text: `Voted for ${votedPlayer.name} as Player of the Match! 🌟`,
        timestamp: 'Just now',
        likes: 1,
        isMotmVote: true,
        motmPlayer: votedPlayer.name
      };
      setPosts([votePost, ...posts]);
    }
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: FanWallPost = {
      id: 'fwp_' + Date.now(),
      author: 'You (Supporter)',
      badge: 'Matchday Fan',
      text: newPostText.trim(),
      timestamp: 'Just now',
      likes: 0
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  const quickReactions = [
    'COYS! 🤍💙',
    'To Dare Is To Do!',
    'What a save from Vicario!',
    'Sonny absolute class 🔥',
    'Van de Ven fastest in the league!'
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Top Bar with Match Context */}
      <div className="bg-[#0a1c3d] p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {matchStatus === 'LIVE' ? `LIVE MATCH (78')` : 'MATCHDAY ATMOSPHERE'}
            </span>
            <span className="text-xs text-slate-300 font-semibold">
              Spurs vs {opponent}
            </span>
          </div>
          <h3 className="text-lg font-black tracking-tight mt-1">
            Supporter Atmosphere & Man of the Match
          </h3>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-white/10 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('motm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'motm'
                ? 'bg-[#4ea8de] text-[#06142e] shadow-sm'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Man of the Match
          </button>
          <button
            onClick={() => setActiveTab('wall')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'wall'
                ? 'bg-[#4ea8de] text-[#06142e] shadow-sm'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Live Fan Wall
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 space-y-5">
        {/* TAB 1: MAN OF THE MATCH VOTING */}
        {activeTab === 'motm' && (
          <div className="space-y-4">
            {/* 75th Minute Unlock Notice */}
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                {isUnlocked ? (
                  <Unlock className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <div>
                  <span className="font-bold text-slate-900">
                    {isUnlocked ? 'MOTM Voting is LIVE (75th Minute Reached)' : 'Unlocks at the 75th Minute of Every Match'}
                  </span>
                  <p className="text-slate-500 text-[11px]">
                    Cast your official vote for the standout Tottenham Hotspur performer.
                  </p>
                </div>
              </div>

              {/* Simulation Toggle */}
              <button
                onClick={() => setForceUnlock(!forceUnlock)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-bold text-slate-600 transition-colors"
              >
                {forceUnlock ? 'Lock Voting' : 'Unlock Now'}
              </button>
            </div>

            {/* Candidates Voting List */}
            <div className="space-y-2.5">
              {candidates.map((player) => {
                const isSelected = selectedCandidateId === player.id;
                return (
                  <div
                    key={player.id}
                    className={`relative border rounded-xl p-3.5 transition-all overflow-hidden ${
                      isSelected
                        ? 'border-[#0284c7] bg-blue-50/40 ring-1 ring-[#0284c7]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {/* Live Progress Bar Background */}
                    <div 
                      className="absolute top-0 bottom-0 left-0 bg-[#0284c7]/10 transition-all duration-500 pointer-events-none"
                      style={{ width: `${player.percentage}%` }}
                    />

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0a1c3d] text-white flex items-center justify-center font-black text-xs shrink-0">
                          #{player.number}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm">{player.name}</h4>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                              {player.position}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-slate-500">
                            {player.votes.toLocaleString()} votes ({player.percentage}%)
                          </span>
                        </div>
                      </div>

                      {/* Vote Button or Selected Badge */}
                      {hasVoted ? (
                        isSelected ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Your Vote
                          </span>
                        ) : (
                          <span className="text-xs font-extrabold text-slate-700">
                            {player.percentage}%
                          </span>
                        )
                      ) : (
                        <button
                          disabled={!isUnlocked}
                          onClick={() => handleVote(player.id)}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isUnlocked
                              ? 'bg-[#0a1c3d] hover:bg-[#0284c7] text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Vote
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE SUPPORTER FAN WALL */}
        {activeTab === 'wall' && (
          <div className="space-y-4">
            {/* Post Message Input Form */}
            <form onSubmit={handleAddPost} className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Share match reaction or cheer for the team..."
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ea8de] pr-20"
                />
                <button
                  type="submit"
                  disabled={!newPostText.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#0a1c3d] text-white text-xs font-bold hover:bg-[#0284c7] transition-all disabled:opacity-40"
                >
                  Post
                </button>
              </div>

              {/* Quick Reactions Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <span className="text-[10px] font-bold text-slate-400 shrink-0">Quick Cheers:</span>
                {quickReactions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setNewPostText(q)}
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold whitespace-nowrap transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </form>

            {/* Posts Stream */}
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {posts.map((post) => (
                <div key={post.id} className="border border-slate-200 rounded-xl p-3.5 bg-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">{post.author}</span>
                      {post.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#0284c7]">
                          {post.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {post.text}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-rose-600 transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500/20 text-rose-500" />
                      {post.likes} Cheers
                    </button>

                    {post.isMotmVote && (
                      <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Player of the Match Pick
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
