import { Region, RuleQuiz, Spot } from '../types';

export const REGIONS: Region[] = [
  {
    id: 'kyoto',
    name: { ja: '京都', en: 'Kyoto', zh: '京都', ko: '교토' },
    center: [35.0116, 135.7681]
  },
  {
    id: 'tokyo',
    name: { ja: '東京 (浅草周辺)', en: 'Tokyo (Asakusa)', zh: '东京 (浅草)', ko: '도쿄 (아사쿠사)' },
    center: [35.7148, 139.7967]
  }
];

export const MOCK_QUIZZES: RuleQuiz[] = [
  {
    id: 'quiz-kyoto-1',
    regionId: 'kyoto',
    question: {
      ja: '祗園などの私道や路上でのマナーとして適切なものはどれですか？',
      en: 'What is the correct street etiquette when visiting Gion in Kyoto?',
      zh: '在京都祗园等私道或街路上，以下哪项行为是正确的？',
      ko: '교토 기온 등의 사유지 도로나 길거리での 올바른 매너는 무엇인가요?'
    },
    options: {
      ja: [
        '舞妓さんを許可なく撮影したり触ったりしない',
        '歩きながら大声で通話する',
        'ゴミは道路の端に置いておく'
      ],
      en: [
        'Do not photograph or touch Maiko without permission',
        'Talk loudly on the phone while walking',
        'Leave trash on the side of the road'
      ],
      zh: [
        '不未经允许拍摄或触碰舞妓',
        '边走边大声打电话',
        '将垃圾留在路边'
      ],
      ko: [
        '허락 없이 마이코를 촬영하거나 만지지 않는다',
        '걸어가면서 큰 소리로 통화한다',
        '쓰레기는 길가에 놓아둔다'
      ]
    },
    correctIndex: 0,
    explanation: {
      ja: '観光マナーを守ることで地域の生活空間を保護します。正解で100pt獲得！',
      en: 'Respecting local manners helps protect community life. You earned 100 pts!',
      zh: '遵守旅游礼仪有助于保护当地生活环境。回答正确獲得 100pt！',
      ko: '관광 매너를 지키면 지역 주민의 생활 환경を 보호할 수 있습니다. 100pt 획득!'
    },
    pointsReward: 100
  }
];

export const MOCK_SPOTS: Spot[] = [
  // 有名・混雑スポット (低ポイント)
  {
    id: 'spot-kiyomizu',
    regionId: 'kyoto',
    name: { ja: '清水寺', en: 'Kiyomizu-dera Temple', zh: '清水寺', ko: '키요미즈데라' },
    description: { ja: '現在非常に混雑しています', en: 'Currently extremely crowded', zh: '目前非常拥挤', ko: '현재 매우 붐빔' },
    lat: 34.9949,
    lng: 135.7850,
    isPopular: true,
    pointsReward: 10
  },
  // 穴場スポット (高ポイントで誘導)
  {
    id: 'spot-bishamon',
    regionId: 'kyoto',
    name: { ja: '毘沙門堂', en: 'Bishamondo Temple', zh: '毗沙门堂', ko: '비샤몬도' },
    description: { ja: '人が少なく落ち着いて拝観できる穴場スポット', en: 'Quiet hidden gem with fewer tourists', zh: '游客较少的安静宝藏寺院', ko: '관광객이 적고 조용한 숨은 명소' },
    lat: 34.9912,
    lng: 135.8155,
    isPopular: false,
    pointsReward: 250
  },
  {
    id: 'spot-daikakuji',
    regionId: 'kyoto',
    name: { ja: '大覚寺', en: 'Daikaku-ji Temple', zh: '大觉寺', ko: '다이카쿠지' },
    description: { ja: '広大な池園美を楽しめるゆったりとした史跡', en: 'Spacious historical temple surrounding a large pond', zh: '拥有壮丽池塘与悠久历史的宁静寺院', ko: '연못이 아름답고 넓은 역사적 사찰' },
    lat: 35.0282,
    lng: 135.6778,
    isPopular: false,
    pointsReward: 300
  }
];
