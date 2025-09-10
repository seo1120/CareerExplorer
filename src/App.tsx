import React, { useMemo, useState, useEffect } from "react";

// ░░░ Hack Your Future – Local MVP (single‑file React, TypeScript) ░░░
// • No backend, runs locally. Data persists in localStorage.
// • Flow: Landing → Wizard(3 steps) → Results(Top 3 careers + roadmap)
// • Simple scoring: interests/values/traits → rank careers from seed.

export default function App() {
  const [stage, setStage] = useState<"landing" | "wizard" | "result">("landing");
  const [step, setStep] = useState(0);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  // ── Form state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [education, setEducation] = useState("");
  const [major, setMajor] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [valueRankings, setValueRankings] = useState<string[]>([]);
  const [choices, setChoices] = useState<Record<string, string>>({});

  // Restore previous session
  useEffect(()=>{
    const raw = localStorage.getItem("hyf_session");
    if(raw){
      try{
        const s = JSON.parse(raw);
        setName(s.name||"");
        setAge(s.age||"");
        setEducation(s.education||"");
        setMajor(s.major||"");
        setInterests(s.interests||[]);
        setValueRankings(s.valueRankings||[]);
        setChoices(s.choices||{});
      }catch{}
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    const payload = { name, age, education, major, interests, valueRankings, choices };
    localStorage.setItem("hyf_session", JSON.stringify(payload));
  }, [name, age, education, major, interests, valueRankings, choices]);

  // ── Seed data (careers)
  const careers: Career[] = useMemo(()=>[
    {
      id: "ux-designer",
      title: "UX 디자이너",
      description: "사용자 경험을 설계하고 개선하는 디자이너로, 사용자 중심의 제품을 만드는 것이 핵심 업무입니다.",
      tags: ["Artistic", "Creative", "People", "Social", "Education"],
      valueProfile: { creativity: 5, impact: 4, stability: 3, challenge: 2, income: 3, publicGood: 4 },
      skills: ["Figma", "User Research", "Prototyping"],
      salary: "연봉 3,500만원 ~ 6,000만원",
      requirements: ["디자인 감각", "사용자 이해", "커뮤니케이션 능력"],
      workEnvironment: "스타트업, IT 기업, 디자인 에이전시",
      growth: "사용자 중심 제품의 중요성이 커지면서 수요 증가",
      roadmap: [
        { step: "1단계: 기초 학습", detail: "UI/UX 기본 강의 수료", duration: "2-3개월", icon: "📚" },
        { step: "2단계: 도구 익히기", detail: "Figma 와이어프레임/프로토타입 제작", duration: "1-2개월", icon: "🎨" },
        { step: "3단계: 사용자 연구", detail: "사용자 인터뷰 10명 진행", duration: "1개월", icon: "👥" },
        { step: "4단계: 프로젝트 실습", detail: "실제 서비스 개선 프로젝트", duration: "2-3개월", icon: "🚀" },
        { step: "5단계: 포트폴리오", detail: "완성도 높은 UX 포트폴리오 제작", duration: "1개월", icon: "💼" }
      ],
      outlook: "사용자 중심 제품 수요 증가로 꾸준한 성장",
    },
    {
      id: "fullstack-dev",
      title: "풀스택 개발자",
      description: "프론트엔드와 백엔드를 모두 개발하며, 웹서비스 전반을 구현하는 개발자입니다.",
      tags: ["Investigative", "Realistic", "Creative", "Business"],
      valueProfile: { creativity: 4, challenge: 4, income: 4, stability: 3, impact: 3, publicGood: 2 },
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "SQL"],
      salary: "연봉 4,500만원 ~ 8,000만원",
      requirements: ["프로그래밍 언어", "프레임워크 이해", "DB 지식"],
      workEnvironment: "스타트업, IT 기업, 전산팀 등",
      growth: "서비스 전반을 다루는 풀스택의 수요는 꾸준히 증가",
      roadmap: [
        { step: "1단계", detail: "프론트엔드 기초 학습 (React 등)", duration: "2-3개월", icon: "⚛️" },
        { step: "2단계", detail: "백엔드 기초 학습 (Node.js/Express)", duration: "2-3개월", icon: "🖥️" },
        { step: "3단계", detail: "DB/ORM 활용 프로젝트", duration: "1-2개월", icon: "🗄️" },
        { step: "4단계", detail: "풀스택 개인 프로젝트 제작", duration: "2-3개월", icon: "🚀" }
      ],
      outlook: "스타트업 및 중소기업에서 특히 수요가 많음",
    },
    {
      id: "cloud-engineer",
      title: "클라우드 엔지니어",
      description: "AWS, Azure, GCP 등 클라우드 플랫폼을 활용하여 인프라를 설계하고 운영하는 엔지니어입니다.",
      tags: ["Realistic", "Investigative", "Conventional", "Hardware"],
      valueProfile: { stability: 5, challenge: 4, income: 4, creativity: 2, impact: 3, publicGood: 2 },
      skills: ["AWS", "Docker", "Terraform"],
      salary: "연봉 5,000만원 ~ 9,000만원",
      requirements: ["클라우드 서비스", "인프라 아키텍처", "보안 기초"],
      workEnvironment: "대기업, 스타트업, 클라우드 서비스 기업",
      growth: "클라우드 전환 확대로 수요 급증",
      roadmap: [
        { step: "1단계", detail: "Linux/네트워크 기초 학습", duration: "2-3개월", icon: "🐧" },
        { step: "2단계", detail: "AWS/GCP 기본 서비스 학습", duration: "2-3개월", icon: "☁️" },
        { step: "3단계", detail: "컨테이너(Docker/Kubernetes) 실습", duration: "2-3개월", icon: "🐳" },
        { step: "4단계", detail: "IaC(Terraform) 프로젝트", duration: "2-3개월", icon: "⚙️" },
        { step: "5단계", detail: "클라우드 배포 자동화 경험", duration: "2-3개월", icon: "🚀" }
      ],
      outlook: "기업들의 클라우드 전환이 가속화됨에 따라 지속 성장",
    },
    {
      id: "devops-engineer",
      title: "데브옵스 엔지니어",
      description: "개발과 운영을 연결하며 CI/CD와 자동화를 통해 빠르고 안정적인 배포를 책임집니다.",
      tags: ["Realistic", "Investigative", "Conventional", "Leadership"],
      valueProfile: { stability: 4, challenge: 5, income: 4, creativity: 2, impact: 3, publicGood: 2 },
      skills: ["CI/CD", "Docker", "Kubernetes", "Monitoring"],
      salary: "연봉 5,000만원 ~ 9,000만원",
      requirements: ["CI/CD 파이프라인", "컨테이너 오케스트레이션", "자동화 스크립트"],
      workEnvironment: "대기업 IT, 스타트업, 인프라 기업",
      growth: "빠른 개발과 안정성 확보를 위해 필수적인 역할",
      roadmap: [
        { step: "1단계", detail: "Linux/네트워크 기초 학습", duration: "2-3개월", icon: "🐧" },
        { step: "2단계", detail: "CI/CD 파이프라인 구축", duration: "2-3개월", icon: "🔄" },
        { step: "3단계", detail: "컨테이너/K8s 클러스터 운영", duration: "3-4개월", icon: "☸️" },
        { step: "4단계", detail: "모니터링/로깅 시스템 구축", duration: "2-3개월", icon: "📊" },
        { step: "5단계", detail: "실무 자동화 프로젝트 경험", duration: "3-4개월", icon: "⚡" }
      ],
      outlook: "DevOps 문화 확산으로 지속적 수요",
    },
    {
      id: "data-scientist",
      title: "데이터 사이언티스트",
      description: "대용량 데이터를 분석하여 비즈니스 인사이트를 도출하고 머신러닝 모델을 개발합니다.",
      tags: ["Data", "Analytic", "Investigative", "Business"],
      valueProfile: { challenge: 5, impact: 4, income: 4, stability: 3, creativity: 3, publicGood: 4 },
      skills: ["Python", "SQL", "ML"],
      salary: "연봉 5,000만원 ~ 9,000만원",
      requirements: ["통계학", "머신러닝", "프로그래밍"],
      workEnvironment: "대기업, 스타트업, 연구소",
      growth: "데이터 기반 의사결정의 중요성이 커지면서 수요 급증",
      roadmap: [
        { step: "1단계", detail: "Python/SQL 데이터 분석 기초", duration: "3-4개월", icon: "🐍" },
        { step: "2단계", detail: "통계학/수학 기초 학습", duration: "2-3개월", icon: "📊" },
        { step: "3단계", detail: "기초 ML 프로젝트", duration: "3-4개월", icon: "🤖" },
        { step: "4단계", detail: "캐글/대회 참여", duration: "2-3개월", icon: "🏆" },
        { step: "5단계", detail: "실무 데이터 분석 프로젝트", duration: "2-3개월", icon: "💼" }
      ],
      outlook: "데이터 기반 사회로 전환 가속",
    },
    {
      id: "ml-engineer",
      title: "머신러닝 엔지니어",
      description: "머신러닝 모델을 설계·학습·배포하며 AI 서비스를 실현하는 엔지니어입니다.",
      tags: ["Data", "Analytic", "Investigative", "Creative"],
      valueProfile: { challenge: 5, income: 4, stability: 3, creativity: 4, impact: 3, publicGood: 3 },
      skills: ["TensorFlow", "PyTorch", "MLOps"],
      salary: "연봉 5,500만원 ~ 10,000만원",
      requirements: ["ML/DL", "프로그래밍", "데이터 처리"],
      workEnvironment: "AI 스타트업, 연구소, 대기업 AI팀",
      growth: "AI 서비스 수요 확대로 급격히 성장",
      roadmap: [
        { step: "1단계", detail: "Python/수학 기초 학습", duration: "2-3개월", icon: "📘" },
        { step: "2단계", detail: "ML 기초 학습, 프로젝트 실습", duration: "3-4개월", icon: "🤖" },
        { step: "3단계", detail: "딥러닝 모델 구현 (CNN, RNN)", duration: "3-4개월", icon: "🧠" },
        { step: "4단계", detail: "MLOps 배포 자동화", duration: "2-3개월", icon: "⚙️" },
        { step: "5단계", detail: "실무 AI 프로젝트 경험", duration: "2-4개월", icon: "💼" }
      ],
      outlook: "생성형 AI와 함께 가장 빠르게 성장하는 분야",
    },
    {
      id: "product-manager",
      title: "프로덕트 매니저 (PM)",
      description: "제품의 전략을 수립하고 개발팀을 이끌며 사용자와 비즈니스 요구사항을 조율합니다.",
      tags: ["Leadership", "Business", "People", "Creative", "Social"],
      valueProfile: { impact: 5, creativity: 4, challenge: 4, stability: 2, income: 4, publicGood: 3 },
      skills: ["문제정의", "리더십", "커뮤니케이션"],
      salary: "연봉 5,500만원 ~ 10,000만원",
      requirements: ["비즈니스 이해", "데이터 분석", "커뮤니케이션"],
      workEnvironment: "IT 기업, 스타트업",
      growth: "디지털 제품 확산과 함께 핵심 직군으로 부각",
      roadmap: [
        { step: "1단계", detail: "사용자 인터뷰/리서치", duration: "1-2개월", icon: "👥" },
        { step: "2단계", detail: "MVP 기획/실행", duration: "2개월", icon: "🚀" },
        { step: "3단계", detail: "데이터 기반 개선", duration: "2개월", icon: "📈" }
      ],
      outlook: "팀 협업의 중심 역할",
    },
    {
      id: "cybersecurity-engineer",
      title: "사이버 보안 엔지니어",
      description: "네트워크와 시스템 보안을 책임지고, 해킹 위협에 대응하는 보안 전문가입니다.",
      tags: ["Investigative", "Analytic", "Conventional", "Hardware"],
      valueProfile: { stability: 5, challenge: 4, impact: 4, creativity: 2, income: 4, publicGood: 4 },
      skills: ["Network Security", "Penetration Testing", "Cryptography"],
      salary: "연봉 5,000만원 ~ 9,500만원",
      requirements: ["보안 지식", "네트워크 이해", "문제 해결"],
      workEnvironment: "금융사, IT 기업, 보안 전문기업",
      growth: "사이버 위협 증가로 수요 급증",
      roadmap: [
        { step: "1단계", detail: "네트워크/시스템 기초 학습", duration: "3-4개월", icon: "🌐" },
        { step: "2단계", detail: "보안 기초 이론 학습", duration: "2-3개월", icon: "🔒" },
        { step: "3단계", detail: "취약점 분석, 모의해킹 실습", duration: "3-4개월", icon: "🛡️" },
        { step: "4단계", detail: "보안 인증/자격증 취득", duration: "2-3개월", icon: "📜" },
        { step: "5단계", detail: "실무 보안 프로젝트 경험", duration: "2-3개월", icon: "💼" }
      ],
      outlook: "사이버 보안의 중요성이 높아짐에 따라 지속 성장",
    }
  ], []);

  // ── Compute recommendation
  const profile: Profile = useMemo(()=>({ name, age, education, major, interests, valueRankings, choices }), [name, age, education, major, interests, valueRankings, choices]);
  const ranked = useMemo(()=>rankCareers(careers, profile), [careers, profile]);
  const top3 = ranked.slice(0,3);

  // ── UI helpers
  const pill = (label: string, active: boolean) => (
    <span className={"px-3 py-1 rounded-full text-sm border mr-2 mb-2 " + (active?"bg-purple-600 text-white border-purple-600":"bg-white text-gray-700 border-gray-300")}>
      {label}
    </span>
  );

  return (
    <div style={styles.page}>
      <style>{`
        /* Responsive helpers */
        @media (max-width: 760px) {
          .container { padding: 0 12px; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .actions { flex-direction: column !important; gap: 8px; }
          .btn { width: 100%; }
          .card { padding: 12px !important; border-radius: 12px !important; }
          .title-xl { font-size: clamp(28px, 8vw, 44px) !important; }
          .title-lg { font-size: clamp(20px, 5.5vw, 28px) !important; }
        }
      `}</style>

      <div style={styles.container} className="container">
        {stage === "landing" && (
          <section style={{width:'100%'}}>
            <header style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-start', padding:'16px 24px'}}>
              <div style={{display:'flex', alignItems:'center', gap:10, color:'#0f172a'}}>
                <div style={{width:36, height:36, borderRadius:8, background:'#EC4899', display:'grid', placeItems:'center', color:'#fff', fontWeight:800}}>★</div>
                <h2 style={{margin:0, fontSize:20, fontWeight:800}}>Career Explorer</h2>
              </div>
            </header>

            <div style={{display:'flex', width:'100%', minHeight:520, alignItems:'center', justifyContent:'center', padding:'60px 20px', textAlign:'center'}}>
              <div style={{maxWidth:960, margin:'0 auto'}}>
                <h1 style={styles.h1}>Discover Your <span style={{color:'#EC4899'}}>Future!</span></h1>
                <p style={{...styles.subtitle, fontSize:22, maxWidth:760, margin:'14px auto 0'}}>Unlock your potential and find the perfect career path with our personalized assessment.</p>
                <button style={styles.cta} className="btn" onClick={()=>{ setStage('wizard'); setStep(0); }}>Get Started</button>
              </div>
            </div>

          </section>
        )}

        {stage === "wizard" && (
          <section style={{paddingTop: '40px', paddingBottom: '40px'}}>
            <Progress current={step} total={3} />
            {step === 0 && (
              <div style={styles.card} className="card">
                <h3 style={styles.cardTitle}>기본 정보</h3>
                <Grid className="grid-2">
                  <Field label="이름"><input value={name} onChange={e=>setName(e.target.value)} placeholder="이름" /></Field>
                  <Field label="나이"><input value={age} onChange={e=>setAge(e.target.value)} placeholder="21" /></Field>
                  <Field label="학력">
                    <select value={education} onChange={e=>setEducation(e.target.value)} style={{width:'100%', padding:'10px 12px', border:'1px solid #ddd', borderRadius:10, fontSize:14, background:'white'}}>
                      <option value="">학력을 선택해주세요</option>
                      <option value="고등학교 졸업">고등학교 졸업</option>
                      <option value="전문대 재학">전문대 재학</option>
                      <option value="전문대 졸업">전문대 졸업</option>
                      <option value="대학교 재학">대학교 재학</option>
                      <option value="대학교 졸업">대학교 졸업</option>
                      <option value="대학원 재학/졸업">대학원 재학/졸업</option>
                      <option value="박사 과정/졸업">박사 과정/졸업</option>
                    </select>
                  </Field>
                  <Field label="전공">
                    <select value={major} onChange={e=>setMajor(e.target.value)} style={{width:'100%', padding:'10px 12px', border:'1px solid #ddd', borderRadius:10, fontSize:14, background:'white'}}>
                      <option value="">전공을 선택해주세요</option>
                      <option value="컴퓨터공학">컴퓨터공학</option>
                      <option value="소프트웨어공학">소프트웨어공학</option>
                      <option value="정보통신공학">정보통신공학</option>
                      <option value="데이터사이언스">데이터사이언스</option>
                      <option value="수학">수학</option>
                      <option value="통계학">통계학</option>
                      <option value="경영학">경영학</option>
                      <option value="경제학">경제학</option>
                      <option value="마케팅">마케팅</option>
                      <option value="디자인">디자인</option>
                      <option value="시각디자인">시각디자인</option>
                      <option value="UX/UI디자인">UX/UI디자인</option>
                      <option value="기계공학">기계공학</option>
                      <option value="전자공학">전자공학</option>
                      <option value="기타">기타</option>
                    </select>
                  </Field>
                </Grid>
              </div>
            )}

            {step === 1 && (
              <div style={styles.card} className="card">
                <h3 style={{...styles.cardTitle, marginBottom: 16}}>관심사/취향 (복수 선택)</h3>
                <MultiSelect
                  options={["Artistic","Creative","People","Social","Education","Investigative","Realistic","Conventional","Leadership","Business","Data","Analytic","Hardware"]}
                  selected={interests}
                  onChange={setInterests}
                />

                <div style={{height:24}} />
                <h3 style={styles.cardTitle}>가치관 순위 매기기</h3>
                <p style={{color:'#666', fontSize:14, marginBottom:16}}>다음 가치들을 중요도 순서대로 드래그해서 정렬해주세요 (1순위가 가장 중요)</p>
                <ValueRanking 
                  values={["안정성", "도전", "영향력", "창의성", "수익", "공익"]}
                  rankings={valueRankings}
                  onChange={setValueRankings}
                />
              </div>
            )}

            {step === 2 && (
              <div style={styles.card} className="card">
                <h3 style={{...styles.cardTitle, marginBottom: 16}}>상황 선택 (A/B)</h3>
                <AB
                  qid="deadline"
                  question="마감 임박! 어떻게 해결할래?"
                  a="내가 직접 코딩/실행해서 마무리" 
                  b="팀 조율/분담으로 전체를 굴린다"
                  value={choices.deadline}
                  onChange={(v)=>setChoices({...choices, deadline:v})}
                />
                <AB
                  qid="launch"
                  question="새 제품 런칭 준비, 먼저 뭘 할래?"
                  a="사용자 인터뷰/문제 정의"
                  b="데이터 실험/기술 검증"
                  value={choices.launch}
                  onChange={(v)=>setChoices({...choices, launch:v})}
                />
                <AB
                  qid="learning"
                  question="학습 스타일은?"
                  a="작게 만들어보며 배우기"
                  b="문서/이론을 깊게 이해 후 구현"
                  value={choices.learning}
                  onChange={(v)=>setChoices({...choices, learning:v})}
                />
              </div>
            )}

            <div className="actions" style={{display:"flex", justifyContent:"space-between", marginTop:16}}>
              <button style={styles.secondary} className="btn" onClick={()=> step===0? setStage("landing"): setStep(step-1)}>이전</button>
              {step<2 ? (
                <button style={styles.primary} className="btn" onClick={()=> setStep(step+1)}>다음</button>
              ) : (
                <button style={styles.primary} className="btn" onClick={()=> setStage("result")}>결과 보기</button>
              )}
            </div>
          </section>
        )}

        {stage === "result" && (
          <section style={{paddingTop: '40px', paddingBottom: '40px'}}>
            <h2 style={styles.h2} className="title-lg">{name? `${name}님을 위한 추천 결과` : "추천 결과"}</h2>
            <p style={{color:'#555', marginTop:-8}}>입력한 정보/관심사/가치관/선택을 토대로 상위 3개 직업을 제안합니다.</p>

            {top3.map((item, idx)=> (
              <div key={item.career.id} style={{...styles.card, cursor:'pointer'}} className="card" onClick={() => setSelectedCareer(item.career)}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8, paddingRight: 16}}>
                  <h3 style={styles.cardTitle}>{idx+1}. {item.career.title}</h3>
                  <span style={{fontWeight:600, color:'#EC4899', fontSize:14}}>매칭점수 {Math.round(item.score)}</span>
                </div>
                <p style={{color:'#666', fontSize:14, marginTop:8, marginBottom:12}}>{item.career.description}</p>
                <div style={{marginBottom:8}}>
                  {(item.career.tags||[]).map(t=> pill(t, true))}
                </div>
                <ul style={{marginTop:6, color:'#333', listStyle:'none', paddingLeft:0}}>
                  <li>• 관심사/태그 적합도 높음</li>
                  <li>• 가치관 정합도({valueRankingScore(valueRankings, item.career.valueProfile).toFixed(1)})</li>
                  <li>• 전망: {item.career.outlook}</li>
                </ul>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8}}>
                  <small style={{color:'#64748b'}}>
                    나이 {item.breakdown?.age.toFixed(1)} / 학력 {item.breakdown?.edu.toFixed(1)} / 전공 {item.breakdown?.major.toFixed(1)} / 관심사 {item.breakdown?.tag.toFixed(1)} / 가치관 {item.breakdown?.val.toFixed(1)} / 선택 {item.breakdown?.choice.toFixed(1)}
                  </small>
                </div>
                <p style={{marginTop:12, color:'#EC4899', fontSize:14, fontWeight:500, textAlign:'center'}}>
                  💡 카드를 클릭하면 상세 정보와 로드맵을 확인할 수 있습니다
                </p>
              </div>
            ))}

            <div style={{display:"flex", gap:8}} className="actions">
              <button style={styles.secondary} className="btn" onClick={()=> { setStage("wizard"); setStep(0);} }>다시 설문하기</button>
              <button style={styles.ghost} className="btn" onClick={()=> { localStorage.removeItem("hyf_session"); location.reload(); }}>데이터 초기화</button>
            </div>
          </section>
        )}
      </div>

      <footer style={{textAlign:"center", fontSize:12, color:"#667", marginTop:24}}>
        Made for hackathon • Local MVP • No backend • © 2025 Career Explorer
      </footer>

      {/* Career Detail Modal */}
      {/* Career Detail Modal */}
      {selectedCareer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={() => setSelectedCareer(null)}>
          <div style={{
            background: 'white',
            borderRadius: 16,
            padding: 24,
            maxWidth: 800,
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
              <h2 style={{margin: 0, fontSize: 24, fontWeight: 800, color: '#1e293b'}}>
                {selectedCareer.title}
              </h2>
              <button 
                onClick={() => setSelectedCareer(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  color: '#64748b',
                  padding: 4
                }}
              >
                ×
              </button>
            </div>

            <div style={{marginBottom: 20}}>
              <p style={{fontSize: 16, color: '#475569', lineHeight: 1.6, margin: 0}}>
                {selectedCareer.description}
              </p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20}}>
              <div>
                <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 8, color: '#1e293b'}}>💰 급여 정보</h3>
                <p style={{color: '#475569', margin: 0}}>{selectedCareer.salary}</p>
              </div>
              <div>
                <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 8, color: '#1e293b'}}>📈 성장 전망</h3>
                <p style={{color: '#475569', margin: 0}}>{selectedCareer.growth}</p>
              </div>
            </div>

            <div style={{marginBottom: 20}}>
              <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 8, color: '#1e293b'}}>🏢 근무 환경</h3>
              <p style={{color: '#475569', margin: 0}}>{selectedCareer.workEnvironment}</p>
            </div>

            <div style={{marginBottom: 20}}>
              <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 8, color: '#1e293b'}}>🎯 필요 역량</h3>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
                {selectedCareer.requirements.map((req, i) => (
                  <span key={i} style={{
                    padding: '6px 12px',
                    background: '#f1f5f9',
                    color: '#475569',
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: 500
                  }}>
                    {req}
                  </span>
                ))}
              </div>
            </div>

            <div style={{marginBottom: 20}}>
              <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 8, color: '#1e293b'}}>🛠️ 핵심 기술</h3>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
                {selectedCareer.skills.map((skill, i) => (
                  <span key={i} style={{
                    padding: '6px 12px',
                    background: '#EC4899',
                    color: 'white',
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: 500
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#1e293b'}}>🗺️ 상세 로드맵</h3>
              <div style={{padding:'16px', background:'#f8fafc', borderRadius:12, border:'1px solid #e2e8f0'}}>
                {selectedCareer.roadmap.map((step, i) => (
                  <div key={i} style={{
                    display:'flex',
                    alignItems:'flex-start',
                    gap:12,
                    marginBottom: i < selectedCareer.roadmap.length - 1 ? 16 : 0,
                    paddingBottom: i < selectedCareer.roadmap.length - 1 ? 16 : 0,
                    borderBottom: i < selectedCareer.roadmap.length - 1 ? '1px solid #e2e8f0' : 'none'
                  }}>
                    <div style={{
                      width:32,
                      height:32,
                      borderRadius:'50%',
                      background:'#EC4899',
                      color:'white',
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      fontSize:16,
                      fontWeight:600,
                      flexShrink:0
                    }}>
                      {step.icon}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:4}}>
                        <h4 style={{margin:0, fontSize:16, fontWeight:600, color:'#1e293b'}}>
                          {step.step}
                        </h4>
                        <span style={{
                          padding:'2px 8px',
                          background:'#e0e7ff',
                          color:'#3730a3',
                          borderRadius:12,
                          fontSize:12,
                          fontWeight:500
                        }}>
                          {step.duration}
                        </span>
                      </div>
                      <p style={{margin:0, fontSize:14, color:'#475569', lineHeight:1.5}}>
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────

type Career = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  valueProfile: Partial<Record<string, number>>; // allow missing keys
  skills: string[];
  roadmap: Array<{
    step: string;
    detail: string;
    duration: string;
    icon: string;
  }>;
  outlook: string;
  salary: string;
  requirements: string[];
  workEnvironment: string;
  growth: string;
};

type Profile = {
  name: string;
  age: string;
  education: string;
  major: string;
  interests: string[];
  valueRankings: string[];
  choices: Record<string, string>;
};

// ────────────────────────────────────────────────────────────
// Scoring
// ────────────────────────────────────────────────────────────

function rankCareers(careers: Career[], profile: Profile){
  const results = careers.map(c => {
    const tagScore = overlapScore(profile.interests, c.tags) * 2; // interests weight
    const valScore = valueRankingScore(profile.valueRankings, c.valueProfile) * 1.5;
    const choiceScore = choiceBonus(profile.choices, c);
    const majorBoost = profile.major && matchMajor(profile.major, c.title) ? 5 : 0;
    if(profile.major) {
      console.log(`전공 "${profile.major}" vs 직업 "${c.title}": 매칭=${matchMajor(profile.major, c.title)}, 보너스=${majorBoost}`);
    }
    const educationBoost = getEducationBoost(profile.education);
    const ageBoost = getAgeBoost(profile.age, c);
    const total = tagScore + valScore + choiceScore + majorBoost + educationBoost + ageBoost;
    
    // Debug logging
    console.log(`${c.title}: tag=${tagScore.toFixed(1)}, val=${valScore.toFixed(1)}, choice=${choiceScore.toFixed(1)}, major=${majorBoost}, edu=${educationBoost.toFixed(1)}, age=${ageBoost.toFixed(1)}, total=${total.toFixed(1)}`);
    
    return { career: c, score: total, breakdown: { tag: tagScore, val: valScore, choice: choiceScore, major: majorBoost, edu: educationBoost, age: ageBoost } };
  });
  results.sort((a,b)=> b.score - a.score);
  return results;
}

function overlapScore(a: string[] = [], b: string[] = []){
  if (a.length === 0 || b.length === 0) return 0;
  
  const set = new Set(a);
  let hit = 0;
  b.forEach(x=> { if(set.has(x)) hit++; });
  
  // 매칭 정확도 계산
  const matchRatio = hit / b.length; // 직업 태그 대비 매칭 비율
  const precision = hit / a.length; // 사용자 관심사 대비 매칭 정확도
  
  // 정확도와 매칭 비율의 조화평균 (둘 다 높아야 좋은 점수)
  const harmonicMean = (2 * matchRatio * precision) / (matchRatio + precision + 0.001);
  
  return harmonicMean * 10; // 0-10 범위로 정규화
}

function valueRankingScore(rankings: string[] = [], target: Partial<Record<string, number>> = {}){
  if (rankings.length === 0) return 0;
  
  // Map Korean values to English keys
  const valueMap: Record<string, string> = {
    "안정성": "stability",
    "도전": "challenge", 
    "영향력": "impact",
    "창의성": "creativity",
    "수익": "income",
    "공익": "publicGood"
  };
  
  let score = 0;
  rankings.forEach((value, index) => {
    const englishKey = valueMap[value];
    if (englishKey && target[englishKey]) {
      // Higher ranking (lower index) gets more weight
      // Always use 6 as base for consistent weighting
      // 1st place gets 6 points, 2nd gets 5, etc.
      const weight = 6 - index;
      const targetValue = target[englishKey] || 0;
      score += weight * targetValue;
    }
  });
  
  // Normalize to 0-10 scale
  // Use fixed 6 as base for consistent normalization
  const maxPossibleScore = 6 * 5 * (6 + 1) / 2; // 105 (6+5+4+3+2+1) * 5
  return maxPossibleScore > 0 ? (score / maxPossibleScore) * 10 : 0;
}

function choiceBonus(choices: Record<string,string>, c: Career){
  let s = 0;
  
  // 마감 상황: 특정 직업만 점수 (차별화) - 가중치 대폭 증가
  if(choices.deadline === "a" && (c.id.includes("dev")||c.id.includes("engineer"))) s += 5.0; // hands-on
  if(choices.deadline === "b" && (c.id.includes("manager")||c.id.includes("ux"))) s += 5.0; // coordination
  
  // 런칭 준비: 특정 직업만 점수 (차별화) - 가중치 대폭 증가
  if(choices.launch === "a" && (c.id.includes("ux")||c.id.includes("manager"))) s += 4.0; // user-first
  if(choices.launch === "b" && (c.id.includes("data")||c.id.includes("ml")||c.id.includes("cloud")||c.id.includes("devops")||c.id.includes("cybersecurity"))) s += 4.0; // experiment-first
  
  // 학습 스타일: 특정 직업만 점수 (차별화) - 가중치 대폭 증가
  if(choices.learning === "a" && (c.id.includes("ux")||c.id.includes("dev")||c.id.includes("cloud")||c.id.includes("devops"))) s += 4.0;
  if(choices.learning === "b" && (c.id.includes("data")||c.id.includes("ml")||c.id.includes("engineer")||c.id.includes("cybersecurity")||c.id.includes("manager"))) s += 4.0;
  
  return s;
}

function matchMajor(major: string, title: string){
  const t = title.toLowerCase();
  
  // 컴퓨터/소프트웨어 관련 전공
  if(major === "컴퓨터공학" || major === "소프트웨어공학" || major === "정보통신공학"){
    return ["developer","engineer","fullstack","cloud","devops","pm","product","cybersecurity","보안"].some(k=> t.includes(k));
  }
  
  // 데이터 관련 전공
  if(major === "데이터사이언스" || major === "수학" || major === "통계학"){
    return ["data","scientist","engineer","데이터","ml","머신러닝"].some(k=> t.includes(k));
  }
  
  // 디자인 관련 전공
  if(major === "디자인" || major === "시각디자인" || major === "UX/UI디자인"){
    return ["ux","designer"].some(k=> t.includes(k));
  }
  
  // 경영/비즈니스 관련 전공
  if(major === "경영학" || major === "경제학" || major === "마케팅"){
    return ["manager","pm","product"].some(k=> t.includes(k));
  }
  
  // 공학 관련 전공
  if(major === "기계공학" || major === "전자공학"){
    return ["engineer","developer","cloud","devops","cybersecurity","보안"].some(k=> t.includes(k));
  }
  
  return false;
}

function getEducationBoost(education: string){
  const edu = education.toLowerCase();
  
  // 박사 과정/졸업
  if(edu.includes("박사")){
    return 4;
  }
  
  // 대학원 재학/졸업
  if(edu.includes("대학원")){
    return 3;
  }
  
  // 대학교 졸업
  if(edu.includes("대학교") && edu.includes("졸업")){
    return 2;
  }
  
  // 대학교 재학
  if(edu.includes("대학교") && edu.includes("재학")){
    return 1.5;
  }
  
  // 전문대 졸업
  if(edu.includes("전문대") && edu.includes("졸업")){
    return 1;
  }
  
  // 전문대 재학
  if(edu.includes("전문대") && edu.includes("재학")){
    return 0.5;
  }
  
  // 고등학교 졸업
  if(edu.includes("고등학교")){
    return 0.2;
  }
  
  return 0;
}

function getAgeBoost(age: string, career: Career){
  const ageNum = parseInt(age) || 25; // 기본값 25세
  
  // 로드맵 총 기간 계산 (개월 단위)
  const totalMonths = career.roadmap.reduce((total, step) => {
    const duration = step.duration;
    if(duration.includes("3-4개월")) return total + 3.5;
    if(duration.includes("2-3개월")) return total + 2.5;
    if(duration.includes("1-2개월")) return total + 1.5;
    if(duration.includes("2개월")) return total + 2;
    if(duration.includes("1개월")) return total + 1;
    return total + 2; // 기본값
  }, 0);
  
  // 20-25세: 12개월 이상 로드맵에 보너스 (장기 성장 직업)
  if(ageNum >= 20 && ageNum <= 25) {
    // 12개월 이상 로드맵에 보너스 (클라우드, 데브옵스, 머신러닝, 데이터, 사이버보안)
    if(totalMonths >= 12) {
      return 3.0;
    }
    return 0;
  }
  
  // 26-29세: 12개월 이하 로드맵에 보너스 (빠른 전환)
  if(ageNum >= 26 && ageNum <= 29) {
    // 12개월 이하 로드맵에 보너스 (UX, 풀스택, PM)
    if(totalMonths <= 12) {
      return 2.0;
    }
    return 0;
  }
  
  // 30세 이상: UX와 PM에 특별 보너스
  if(ageNum >= 30) {
    let bonus = 0;
    // UX와 PM에 특별 보너스
    if(career.id.includes("ux") || career.id.includes("manager")) {
      bonus += 2.0;
    }
    // 12개월 이하 로드맵에도 일반 보너스
    if(totalMonths <= 12) {
      bonus += 2.0;
    }
    return bonus;
  }
  
  return 0;
}

// ────────────────────────────────────────────────────────────
// UI components (minimal CSS-in-JS)
// ────────────────────────────────────────────────────────────

function Field({label, children}:{label:string, children:React.ReactNode}){
  return (
    <label style={{display:"flex", flexDirection:"column", gap:6}}>
      <span style={{fontSize:13, color:'#444'}}>{label}</span>
      <div style={{display:"flex", alignItems:"center"}} className="input-wrapper">
        {children}
      </div>
      <style>{`
        .input-wrapper > input{width:100%; padding:10px 12px; border:1px solid #ddd; border-radius:10px; font-size:14px;}
        .input-wrapper > input:focus{outline:none; border-color:#8b5cf6; box-shadow:0 0 0 3px rgba(139,92,246,.15)}
      `}</style>
    </label>
  );
}

function Grid({children, className}:{children:React.ReactNode, className?:string}){
  return <div className={className} style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>{children}</div>;
}

function MultiSelect({options, selected, onChange}:{options:string[]; selected:string[]; onChange:(v:string[])=>void}){
  return (
    <div style={{display:"flex", flexWrap:"wrap"}}>
      {options.map(op=>{
        const active = selected.includes(op);
        return (
          <button key={op}
            onClick={()=> onChange(active ? selected.filter(x=>x!==op) : [...selected, op])}
            className="btn"
            style={{
              padding:'8px 12px', margin:'0 8px 8px 0', borderRadius:999,
              border:'1px solid ' + (active ? '#EC4899' : '#cbd5e1'),
              background: active ? '#EC4899' : 'white', color: active ? 'white' : '#334155',
              cursor:'pointer', fontSize:14, width:'auto'
            }}>{op}</button>
        );
      })}
    </div>
  );
}

function ValueRanking({values, rankings, onChange}:{values:string[]; rankings:string[]; onChange:(v:string[])=>void}){
  const removeFromRanking = (value: string) => {
    onChange(rankings.filter(v => v !== value));
  };

  const addToRanking = (value: string) => {
    if (!rankings.includes(value)) {
      onChange([...rankings, value]);
    }
  };

  return (
    <div>
      {/* Current Rankings */}
      <div style={{marginBottom: 16}}>
        <h4 style={{fontSize: 16, fontWeight: 600, marginBottom: 8}}>현재 순위</h4>
        <div style={{minHeight: 60, border: '2px dashed #e5e7eb', borderRadius: 8, padding: 12}}>
          {rankings.length === 0 ? (
            <p style={{color: '#9ca3af', textAlign: 'center', margin: 0}}>가치를 클릭해서 순위를 매겨주세요</p>
          ) : (
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
              {rankings.map((value, index) => (
                <div key={value} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  background: '#f3f4f6',
                  borderRadius: 20,
                  border: '1px solid #d1d5db'
                }}>
                  <span style={{fontSize: 12, fontWeight: 600, color: '#EC4899'}}>{index + 1}</span>
                  <span style={{fontSize: 14}}>{value}</span>
                  <button 
                    onClick={() => removeFromRanking(value)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#6b7280',
                      cursor: 'pointer',
                      fontSize: 16,
                      padding: 0,
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >×</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Available Values */}
      <div>
        <h4 style={{fontSize: 16, fontWeight: 600, marginBottom: 8}}>가치 선택</h4>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
          {values.map(value => (
            <button
              key={value}
              onClick={() => rankings.includes(value) ? removeFromRanking(value) : addToRanking(value)}
              style={{
                padding: '8px 16px',
                background: rankings.includes(value) ? '#EC4899' : 'white',
                color: rankings.includes(value) ? 'white' : '#374151',
                border: `1px solid ${rankings.includes(value) ? '#EC4899' : '#d1d5db'}`,
                borderRadius: 20,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                transition: 'all 0.2s'
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AB({qid: _qid, question, a, b, value, onChange}:{qid:string; question:string; a:string; b:string; value?:string; onChange:(v:"a"|"b")=>void;}){
  return (
    <div style={{marginBottom:14}}>
      <div style={{fontWeight:600, marginBottom:8}}>{question}</div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
        <button onClick={()=>onChange("a")} style={{...styles.choice, borderColor: value==="a"? '#EC4899':'#e5e7eb', background:value==="a"? '#ede9fe':'white'}}>A) {a}</button>
        <button onClick={()=>onChange("b")} style={{...styles.choice, borderColor: value==="b"? '#EC4899':'#e5e7eb', background:value==="b"? '#ede9fe':'white'}}>B) {b}</button>
      </div>
    </div>
  );
}

function Progress({current, total}:{current:number; total:number;}){
  const pct = ((current+1)/total)*100;
  return (
    <div style={{marginBottom:16}}>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:6}}>
        <span style={{fontWeight:600}}>Step {current+1} / {total}</span>
        <span style={{color:'#666'}}>{Math.round(pct)}%</span>
      </div>
      <div style={{height:10, background:'#eee', borderRadius:8}}>
        <div style={{height:'100%', width:`${pct}%`, background:'#EC4899', borderRadius:8}} />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Styles
// ────────────────────────────────────────────────────────────

const styles: {[k:string]: React.CSSProperties} = {
  page: { minHeight:"100vh", background:"#ffffff", padding:"0" },
  container: { maxWidth: 1200, margin:"0 auto", padding:"0 16px" },
  h1: { fontSize:56, margin:0, color:'#0f172a', fontWeight:900, textAlign:'center', letterSpacing:-1 },
  h2: { fontSize:28, margin:"0 0 8px 0", color:'#111827', fontWeight:800, textAlign:'left' },
  subtitle: { fontSize:20, color:'#475569', marginTop:8, textAlign:'center' },
  cta: { marginTop:20, padding:"14px 28px", background:'#EC4899', color:'white', border:'none', borderRadius:9999, cursor:'pointer', fontWeight:800, fontSize:18, boxShadow:'0 10px 25px rgba(236,72,153,.35)', transition:'all .2s ease-in-out' },
  card: { background:'white', border:'1px solid #e5e7eb', borderRadius:16, padding:16, marginBottom:16, boxShadow:'0 6px 16px rgba(17,24,39,0.04)' },
  cardTitle: { margin:0, fontSize:18, fontWeight:800 },
  primary: { padding:'10px 16px', background:'#EC4899', color:'white', border:'none', borderRadius:10, cursor:'pointer', fontWeight:700 },
  secondary: { padding:'10px 16px', background:'white', color:'#111827', border:'1px solid #e5e7eb', borderRadius:10, cursor:'pointer', fontWeight:600 },
  ghost: { padding:'10px 16px', background:'transparent', color:'#EC4899', border:'none', borderRadius:10, cursor:'pointer', fontWeight:600 },
  choice: { padding:'12px 14px', borderRadius:12, border:'1px solid', textAlign:'left', cursor:'pointer' }
};
