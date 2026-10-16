import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Language, RegionId, UserProfile, Spot } from './types';
import { REGIONS, MOCK_QUIZZES, MOCK_SPOTS } from './data/mockData';
import { Award, MapPin, Globe, CheckCircle2, User } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// マップ用ピンアイコンの設定
const popularIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  popupAnchor: [1, -34],
  shadowSize: [32, 32]
});

const hiddenGemIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [28, 45],
  iconAnchor: [14, 45],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const App: React.FC = () => {
  // 顧客状態の管理 (ローカル擬似データ)
  const [user, setUser] = useState<UserProfile>({
    id: 'usr_12345',
    language: 'en',
    selectedRegionId: null,
    pointsBalance: 0,
    completedQuizIds: [],
    visitedSpotIds: [],
    createdAt: new Date().toISOString()
  });

  const [step, setStep] = useState<'lang' | 'region' | 'quiz' | 'map'>('lang');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentRegion = REGIONS.find((r) => r.id === user.selectedRegionId);
  const currentQuiz = MOCK_QUIZZES.find((q) => q.regionId === user.selectedRegionId);

  // 1. 言語選択
  const handleSelectLanguage = (lang: Language) => {
    setUser((prev) => ({ ...prev, language: lang }));
    setStep('region');
  };

  // 2. 地域選択
  const handleSelectRegion = (regionId: RegionId) => {
    setUser((prev) => ({ ...prev, selectedRegionId: regionId }));
    setStep('quiz');
  };

  // 3. マナー判定 ＆ ポイント付与
  const handleAnswerQuiz = (index: number) => {
    setSelectedAnswer(index);
    if (currentQuiz && index === currentQuiz.correctIndex) {
      if (!user.completedQuizIds.includes(currentQuiz.id)) {
        setUser((prev) => ({
          ...prev,
          pointsBalance: prev.pointsBalance + currentQuiz.pointsReward,
          completedQuizIds: [...prev.completedQuizIds, currentQuiz.id]
        }));
      }
    }
  };

  // 4. スポットチェックイン (ポイント付与)
  const handleCheckIn = (spot: Spot) => {
    if (user.visitedSpotIds.includes(spot.id)) {
      alert('Already checked in at this location!');
      return;
    }
    setUser((prev) => ({
      ...prev,
      pointsBalance: prev.pointsBalance + spot.pointsReward,
      visitedSpotIds: [...prev.visitedSpotIds, spot.id]
    }));
    alert(`Checked in! Earned ${spot.pointsReward} Points! 🎉`);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col font-sans border-x border-gray-200">
      {/* 顧客情報・ポイント表示ヘッダー */}
      <header className="bg-indigo-600 text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          <span className="font-bold tracking-wide">Japan Gem Map</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-indigo-700 px-3 py-1 rounded-full text-amber-300 font-bold text-sm">
            <Award className="w-4 h-4" />
            <span>{user.pointsBalance} Pts</span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4">
        {/* STEP 1: 言語選択 */}
        {step === 'lang' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
              Select Your Language / 言語を選択
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { code: 'ja', label: '日本語' },
                { code: 'en', label: 'English' },
                { code: 'zh', label: '中文' },
                { code: 'ko', label: '한국어' }
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => handleSelectLanguage(item.code as Language)}
                  className="p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 font-semibold text-gray-700 transition"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: 旅行地域選択 */}
        {step === 'region' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
              Select Destination Area
            </h2>
            <div className="space-y-3">
              {REGIONS.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => handleSelectRegion(reg.id)}
                  className="w-full p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 font-bold text-gray-700 flex justify-between items-center transition"
                >
                  <span>{reg.name[user.language]}</span>
                  <MapPin className="w-5 h-5 text-indigo-500" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: 常識・ルール学習 (ポイント付与) */}
        {step === 'quiz' && currentQuiz && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full">
              Manners & Rules (+{currentQuiz.pointsReward} Pts)
            </span>
            <h3 className="text-md font-bold text-gray-800 mt-3 mb-4">
              {currentQuiz.question[user.language]}
            </h3>
            <div className="space-y-2 mb-4">
              {currentQuiz.options[user.language].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerQuiz(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition ${
                    selectedAnswer === idx
                      ? idx === currentQuiz.correctIndex
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : 'bg-rose-50 border-rose-500 text-rose-900'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <div className="mt-4 p-3 bg-gray-50 rounded-xl text-sm border border-gray-200">
                <p className="text-gray-700 mb-3">{currentQuiz.explanation[user.language]}</p>
                <button
                  onClick={() => setStep('map')}
                  className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-xl hover:bg-indigo-700 transition"
                >
                  Go to Gem Map
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: 混雑分散マップ */}
        {step === 'map' && currentRegion && (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-xs text-emerald-900 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Hidden Gem Bonus:</strong> Visit green map pins to get higher rewards and avoid crowds!
              </div>
            </div>

            <div className="h-[420px] rounded-2xl overflow-hidden shadow-inner border border-gray-200">
              <MapContainer
                center={currentRegion.center}
                zoom={12}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {MOCK_SPOTS.filter((s) => s.regionId === user.selectedRegionId).map((spot) => (
                  <Marker
                    key={spot.id}
                    position={[spot.lat, spot.lng]}
                    icon={spot.isPopular ? popularIcon : hiddenGemIcon}
                  >
                    <Popup>
                      <div className="p-1 min-w-[180px]">
                        {!spot.isPopular && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                            💎 HIDDEN GEM
                          </span>
                        )}
                        <h4 className="font-bold text-sm mt-1">{spot.name[user.language]}</h4>
                        <p className="text-xs text-gray-500 mt-1">{spot.description[user.language]}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="font-extrabold text-amber-600 text-xs">
                            +{spot.pointsReward} Pts
                          </span>
                          <button
                            onClick={() => handleCheckIn(spot)}
                            className="bg-indigo-600 text-white text-xs px-2.5 py-1 rounded-lg font-bold hover:bg-indigo-700"
                          >
                            Check In
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        )}
      </main>

      {/* 簡易フッター (顧客ステータス確認用) */}
      <footer className="bg-white border-t border-gray-200 p-3 text-center text-xs text-gray-4 rate">
        <div className="flex justify-center items-center gap-2 text-gray-500">
          <User className="w-3.5 h-3.5" />
          <span>User ID: {user.id}</span>
          <span>•</span>
          <span>Visited: {user.visitedSpotIds.length} spots</span>
        </div>
      </footer>
    </div>
  );
};
