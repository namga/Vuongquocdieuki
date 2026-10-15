(() => {
'use strict';
const $ = (s,root=document)=>root.querySelector(s);
const app=$('#app');
const STORAGE='be-hoc-vui-save-v1';
const worlds=[
 {id:'math',name:'Lâu Đài Toán Học',short:'Toán vui',emoji:'🏰',tone:'tone-pink',desc:'Đếm số, cộng trừ và quy luật',unlocked:true},
 {id:'language',name:'Đại Dương Ngôn Ngữ',short:'Tiếng Việt',emoji:'🐠',tone:'tone-blue',desc:'Từ ngữ, chữ cái và đọc hiểu',unlocked:true},
 {id:'nature',name:'Rừng Sinh Vật',short:'Khám phá tự nhiên',emoji:'🌳',tone:'tone-green',desc:'Động vật, cây cối và môi trường',unlocked:true},
 {id:'space',name:'Vũ Trụ Khám Phá',short:'Tư duy logic',emoji:'🚀',tone:'tone-purple',desc:'Quy luật, quan sát và mê cung',unlocked:true}
];
const lessons=[
 {id:'count',world:'math',title:'Đếm số cùng thỏ',icon:'🍎',type:'quiz',skill:'Đếm số lượng',age:'5–6 tuổi',description:'Đếm đồ vật và chọn số đúng',questions:[
  q('count1','Có bao nhiêu quả táo?','🍎 🍎 🍎 🍎 🍎',[3,4,5,6],5,'Hãy đếm từng quả táo từ trái sang phải.','Có 5 quả táo. Mỗi quả tương ứng với một số khi đếm.','count'),
  q('count2','Có bao nhiêu chú cá?','🐟 🐟 🐟',[2,3,4,5],3,'Con thử chỉ vào từng chú cá nhé.','Có 3 chú cá.','count'),
  q('count3','Có bao nhiêu ngôi sao?','⭐ ⭐ ⭐ ⭐',[3,4,5,6],4,'Đếm từng ngôi sao một lần.','Có 4 ngôi sao.','count'),
  q('count4','Có bao nhiêu quả bóng?','⚽ ⚽',[1,2,3,4],2,'Chỉ có hai quả bóng trong hình.','Có 2 quả bóng.','count'),
  q('count5','Có bao nhiêu bông hoa?','🌼 🌼 🌼 🌼 🌼 🌼',[4,5,6,7],6,'Đếm từng bông hoa.','Có 6 bông hoa.','count')
 ]},
 {id:'add',world:'math',title:'Phép cộng vui vẻ',icon:'➕',type:'quiz',skill:'Phép cộng',age:'6–8 tuổi',description:'Cộng các số nhỏ qua hình ảnh',questions:[
  q('add1','2 quả táo và thêm 1 quả. Có tất cả bao nhiêu?','🍎 🍎  +  🍎',[2,3,4,5],3,'Bắt đầu với 2, rồi đếm thêm 1.','2 + 1 = 3.','addition'),
  q('add2','3 + 2 bằng mấy?', '🟡 🟡 🟡  +  🟡 🟡',[4,5,6,7],5,'Đếm 3 rồi thêm 2 bước.','3 + 2 = 5.','addition'),
  q('add3','4 + 1 bằng mấy?','🧸 🧸 🧸 🧸 + 🧸',[4,5,6,7],5,'Thêm một là số tiếp theo.','4 + 1 = 5.','addition'),
  q('add4','2 + 2 bằng mấy?','🦋 🦋 + 🦋 🦋',[3,4,5,6],4,'Gộp hai nhóm lại rồi đếm.','2 + 2 = 4.','addition')
 ]},
 {id:'words',world:'language',title:'Từ ngữ quanh em',icon:'📖',type:'quiz',skill:'Từ vựng',age:'5–8 tuổi',description:'Nhận biết từ qua hình ảnh',questions:[
  q('word1','Con vật nào kêu “meo meo”?','🐶  🐱  🐮',['Chó','Mèo','Bò','Vịt'],'Mèo','Hãy nghĩ đến thú cưng thường nằm cuộn tròn và kêu meo meo.','Mèo thường kêu “meo meo”.','vocab'),
  q('word2','Quả nào có màu vàng và thường được khỉ thích?','🍓  🍌  🍇  🍉',['Dâu','Chuối','Nho','Dưa hấu'],'Chuối','Nhìn hình quả dài màu vàng.','Đó là quả chuối.','vocab'),
  q('word3','Ban đêm trên trời thường thấy gì?','🌞  🌙  🌻  🌈',['Mặt trời','Mặt trăng','Hoa','Cầu vồng'],'Mặt trăng','Vật này thường phát sáng trên bầu trời đêm.','Ban đêm ta thường thấy Mặt trăng và các vì sao.','vocab'),
  q('word4','Từ nào chỉ một loại cây?','🪑  🌳  🚗  📚',['Cái ghế','Cây xanh','Xe hơi','Sách'],'Cây xanh','Tìm hình có thân và cành lá.','Cây xanh là một loại thực vật.','vocab')
 ]},
 {id:'nature',world:'nature',title:'Bạn động vật',icon:'🦊',type:'matching',skill:'Phân loại sinh vật',age:'5–8 tuổi',description:'Chọn nơi sống phù hợp',questions:[
  q('nature1','Con vật nào sống dưới nước?','🐪  🐟  🐈  🐓',['Lạc đà','Cá','Mèo','Gà'],'Cá','Hãy chọn con vật có thể bơi và thở bằng mang.','Cá sống trong nước.','habitat'),
  q('nature2','Bộ phận nào giúp cây hút nước?','🌿  🌸  🌱  🍃',['Rễ','Hoa','Quả','Lá'],'Rễ','Bộ phận này nằm dưới đất.','Rễ giúp cây hút nước và chất khoáng.','plants'),
  q('nature3','Con vật nào thường sống trong tổ?','🐝  🐬  🐧  🐄',['Ong','Cá heo','Chim cánh cụt','Bò'],'Ong','Nghĩ đến nơi có nhiều ong sống cùng nhau.','Ong sống thành đàn trong tổ.','habitat')
 ]},
 {id:'logic',world:'space',title:'Mê cung tư duy',icon:'🤖',type:'sequence',skill:'Tư duy logic',age:'7–10 tuổi',description:'Tìm quy luật và chọn bước tiếp theo',questions:[
  q('logic1','Số tiếp theo là số nào? 2, 4, 6, ...','🔢',[7,8,9,10],8,'Mỗi lần tăng thêm 2.','Dãy số tăng thêm 2: 2, 4, 6, 8.','patterns'),
  q('logic2','Hình nào tiếp theo? 🔴 🔵 🔴 🔵 ...','🔴 🔵',[ '🔴','🔵','🟢','🟡'],'🔴','Hai màu đỏ và xanh luân phiên nhau.','Sau màu xanh là màu đỏ.','patterns'),
  q('logic3','Bạn đi 2 bước rồi thêm 1 bước. Tổng cộng mấy bước?','👣 👣 + 👣',[2,3,4,5],3,'Cộng số bước đã đi.','2 + 1 = 3 bước.','sequence')
 ]}
];
function q(id,prompt,visual,answers,answer,hint,explanation,skill){return{id,prompt,visual,answers,answer,hint,explanation,skill};}
function fresh(){return{version:1,stars:0,coins:0,completed:[],attempts:[],skills:{},unlockedPets:['panda'],settings:{sound:true,age:'5-8',largeText:false},lastPlayed:null};}
let state=load(), screen='home', selectedWorld=null, currentLesson=null, questionIndex=0, session={correct:0,firstTry:0,hints:0,answered:false,attempts:0,earned:0};
function load(){try{const x=JSON.parse(localStorage.getItem(STORAGE)||'null');return x&&x.version===1?{...fresh(),...x}:fresh()}catch{return fresh()}}
function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch{};$('#starCount').textContent=state.stars}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function nav(tab){screen=tab;document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));render()}
function head(title,sub=''){return `<div class="page-title"><button class="back" data-action="back">←</button><div><h1>${title}</h1>${sub?`<p>${sub}</p>`:''}</div></div>`}
function render(){save();if(screen==='home')renderHome();else if(screen==='learn')renderLearn();else if(screen==='collection')renderCollection();else if(screen==='progress')renderProgress();else if(screen==='world')renderWorld();else if(screen==='game')renderGame();else if(screen==='result')renderResult();else if(screen==='profile')renderProfile()}
function renderHome(){
 const done=state.completed.length;
 app.innerHTML=`<section class="hero"><h1>Chào nhà thám hiểm nhí! 🌟</h1><p>Mỗi ngày khám phá một điều mới. Cùng các bạn thú khôi phục phép màu cho vương quốc nhé!</p><div class="mascot">🐼</div></section>
 <div class="section-head"><h2>🌟 Nhiệm vụ hôm nay</h2><span>${done} bài đã hoàn thành</span></div>
 <section class="mission"><div class="mission-icon">🧩</div><div style="flex:1"><strong>${done===0?'Bắt đầu hành trình đầu tiên':done<3?'Tiếp tục khám phá nhé':'Tuyệt vời! Bé đang tiến bộ'}</strong><p>${done===0?'Chơi một bài ngắn để nhận sao đầu tiên.':'Hoàn thành thêm một bài và ôn lại kiến thức đã học.'}</p></div><button class="primary" data-action="start">Chơi</button></section>
 <div class="section-head"><h2>🗺️ Khám phá vương quốc</h2><span>4 vùng đất</span></div>
 <div class="world-grid">${worlds.map(w=>`<button class="world-card ${w.tone}" data-world="${w.id}"><span class="world-emoji">${w.emoji}</span><strong>${w.name}</strong><small>${w.desc}</small><span class="lock">✨</span></button>`).join('')}</div>
 <div class="section-head"><h2>🌱 Tiến bộ của bé</h2><span data-action="progress">Xem tất cả →</span></div>
 <div class="stat-grid"><div class="stat"><strong>${state.stars} ⭐</strong><small>Sao học tập</small></div><div class="stat"><strong>${done} 📚</strong><small>Bài đã học</small></div><div class="stat"><strong>${Object.keys(state.skills).filter(k=>state.skills[k].mastery>=80).length} 🌟</strong><small>Kỹ năng vững</small></div></div>`;
}
function renderLearn(){app.innerHTML=`${head('Chọn chuyến phiêu lưu','Mỗi bài chỉ mất khoảng 2–4 phút')}<div class="lesson-list">${lessons.map(l=>`<button class="lesson-card" data-lesson="${l.id}"><span class="lesson-icon">${l.icon}</span><span class="lesson-info"><strong>${l.title}</strong><small>${l.age} · ${l.questions.length} câu · ${l.description}</small></span><span class="chevron">›</span></button>`).join('')}</div><section class="panel" style="margin-top:14px"><strong>💡 Mẹo nhỏ</strong><p style="margin:5px 0 0;color:var(--muted);font-size:13px">Nếu câu hỏi khó, hãy dùng gợi ý. Học chậm mà hiểu rõ cũng rất tuyệt!</p></section>`}
function renderWorld(){const w=worlds.find(x=>x.id===selectedWorld);const ls=lessons.filter(l=>l.world===selectedWorld);app.innerHTML=`${head(w.name,w.desc)}<div class="hero" style="min-height:135px"><h1 style="font-size:24px;max-width:72%">Cùng ${w.emoji} khám phá!</h1><p style="max-width:72%">Hoàn thành bài học để tích lũy kiến thức và sao.</p><div class="mascot">${w.emoji}</div></div><div class="section-head"><h2>Bài học trong vùng đất</h2><span>${ls.length} bài</span></div><div class="lesson-list">${ls.map(l=>lessonCard(l)).join('')}</div>`}
function lessonCard(l){return `<button class="lesson-card" data-lesson="${l.id}"><span class="lesson-icon">${l.icon}</span><span class="lesson-info"><strong>${l.title}</strong><small>${l.age} · ${l.questions.length} câu · ${l.description}</small></span><span class="chevron">›</span></button>`}
function startLesson(id){currentLesson=lessons.find(l=>l.id===id);if(!currentLesson)return;questionIndex=0;session={correct:0,firstTry:0,hints:0,answered:false,attempts:0,earned:0};state.lastPlayed=id;screen='game';render()}
function renderGame(){
 const l=currentLesson,q=l.questions[questionIndex];session.answered=false;
 const pct=Math.round(questionIndex/l.questions.length*100);
 app.innerHTML=`${head(l.title,`Câu ${questionIndex+1}/${l.questions.length} · ${l.age}`)}<section class="game-panel"><div class="question-label">CÙNG HỌC NÀO! ✨</div><div class="progress-line"><div style="width:${pct}%"></div></div><div class="question">${esc(q.prompt)}</div><div class="visual">${esc(q.visual)}</div><div class="answers">${q.answers.map((a,i)=>`<button class="answer" data-answer="${i}">${esc(a)}</button>`).join('')}</div><div id="feedback"></div><div class="game-actions"><button class="secondary" data-action="hint">💡 Gợi ý</button><button class="secondary" data-action="quit">Tạm dừng</button></div></section>`;
}
function answer(index){
 if(session.answered)return;
 const q=currentLesson.questions[questionIndex],chosen=q.answers[index],correct=String(chosen)===String(q.answer);
 session.answered=true;session.attempts++;
 const btns=[...document.querySelectorAll('[data-answer]')];
 btns.forEach((b,i)=>{b.disabled=true;if(String(q.answers[i])===String(q.answer))b.classList.add('correct');if(i===index&&!correct)b.classList.add('wrong')});
 const fb=$('#feedback');fb.className='feedback '+(correct?'':'bad');
 fb.innerHTML=`<strong>${correct?'🎉 Chính xác! Giỏi quá!':'🌱 Gần đúng rồi, mình thử học nhé!'}</strong><p>${esc(q.explanation)}</p>${!correct?`<p>Gợi ý: ${esc(q.hint)}</p>`:''}<button class="primary full" data-action="next">${questionIndex===currentLesson.questions.length-1?'Xem kết quả':'Tiếp tục'} →</button>`;
 if(correct){session.correct++;if(session.attempts===1)session.firstTry++;session.earned+=2;recordSkill(q.skill,true)}
 else{recordSkill(q.skill,false)}
 state.attempts.push({questionId:q.id,correct,firstTry:correct&&session.attempts===1,hintUsed:session.hints>0,at:new Date().toISOString()});if(state.attempts.length>500)state.attempts=state.attempts.slice(-500);
 save();
}
function recordSkill(id,correct){const s=state.skills[id]||{seen:0,correct:0,mastery:0};s.seen++;if(correct)s.correct++;s.mastery=Math.round(s.correct/s.seen*100);state.skills[id]=s}
function showHint(){if(session.answered)return;session.hints++;const q=currentLesson.questions[questionIndex];const fb=$('#feedback');fb.className='feedback';fb.innerHTML=`<strong>💡 Gợi ý nho nhỏ</strong><p>${esc(q.hint)}</p>`;toast('Cố lên, bé làm được!')}
function nextQuestion(){if(questionIndex<currentLesson.questions.length-1){questionIndex++;session.attempts=0;renderGame()}else finishLesson()}
function finishLesson(){const l=currentLesson;const percent=Math.round(session.correct/l.questions.length*100);const earned=Math.max(1,Math.round(session.correct*2+(percent>=80?2:0)));session.earned=earned;state.stars+=earned;state.coins+=earned*2;if(!state.completed.includes(l.id))state.completed.push(l.id);if(state.completed.length>=2&&!state.unlockedPets.includes('rabbit'))state.unlockedPets.push('rabbit');if(state.completed.length>=4&&!state.unlockedPets.includes('fox'))state.unlockedPets.push('fox');save();screen='result';render()}
function renderResult(){const percent=Math.round(session.correct/currentLesson.questions.length*100);app.innerHTML=`<section class="panel result"><div class="big">${percent>=80?'🏆':percent>=50?'🌟':'🌱'}</div><h1>${percent>=80?'Xuất sắc!':percent>=50?'Làm tốt lắm!':'Cùng luyện thêm nhé!'}</h1><p>Bé đã hoàn thành “${currentLesson.title}”. Mỗi lần thử là một bước tiến!</p><div class="stat-grid"><div class="stat"><strong>${session.correct}/${currentLesson.questions.length}</strong><small>Câu đúng</small></div><div class="stat"><strong>+${session.earned} ⭐</strong><small>Sao nhận được</small></div><div class="stat"><strong>${percent}%</strong><small>Kết quả</small></div></div><button class="primary full" data-action="replay">🔁 Chơi lại bài này</button><button class="secondary full" data-action="nextLesson">Khám phá bài khác →</button><button class="secondary full" data-action="home">Về vương quốc 🏰</button></section>`}
const pets=[{id:'panda',name:'Gấu trúc Bông',emoji:'🐼',need:0},{id:'rabbit',name:'Thỏ Mây',emoji:'🐰',need:2},{id:'fox',name:'Cáo Đuôi Bông',emoji:'🦊',need:4},{id:'dino',name:'Khủng long Tí Hon',emoji:'🦕',need:7},{id:'unicorn',name:'Kỳ lân Cầu Vồng',emoji:'🦄',need:10},{id:'owl',name:'Cú Mèo Thông Thái',emoji:'🦉',need:12}];
function renderCollection(){app.innerHTML=`${head('Bộ sưu tập','Những người bạn đồng hành của bé')}<section class="panel" style="margin-bottom:14px"><strong>🎒 Túi kho báu</strong><p style="margin:5px 0 0;color:var(--muted);font-size:13px">Bé có ${state.coins} xu ảo. Nhận thêm bằng cách học và khám phá.</p></section><div class="collection-grid">${pets.map(p=>{const unlocked=state.unlockedPets.includes(p.id)||state.completed.length>=p.need&&p.need===0;return `<div class="pet ${unlocked?'':'locked'}"><div class="pet-emoji">${unlocked?p.emoji:'🔒'}</div><strong>${p.name}</strong><small>${unlocked?'Bạn đồng hành của bé':`Hoàn thành ${p.need} bài để mở khóa`}</small></div>`}).join('')}</div><div class="section-head"><h2>🏡 Trang trí nhà</h2></div><section class="panel"><div style="font-size:44px;text-align:center">🏡 🌷 🌳</div><p style="text-align:center;color:var(--muted);font-size:13px">Góc nhà của bé sẽ có thêm đồ trang trí trong các bản cập nhật tiếp theo.</p></section>`}
function renderProgress(){const attempts=state.attempts;const independent=attempts.filter(a=>a.correct&&a.firstTry).length;const accuracy=attempts.length?Math.round(attempts.filter(a=>a.correct).length/attempts.length*100):0;app.innerHTML=`${head('Tiến bộ của bé','Cùng nhìn lại những điều đã học')}<div class="stat-grid"><div class="stat"><strong>${state.completed.length}</strong><small>Bài hoàn thành</small></div><div class="stat"><strong>${accuracy}%</strong><small>Tỷ lệ đúng</small></div><div class="stat"><strong>${state.stars} ⭐</strong><small>Sao tích lũy</small></div></div><div class="section-head"><h2>🌱 Kỹ năng đang luyện</h2><span>${Object.keys(state.skills).length} kỹ năng</span></div><section class="panel">${Object.entries(state.skills).length?Object.entries(state.skills).map(([k,s])=>`<div class="skill-row"><span class="skill-emoji">${s.mastery>=80?'🌟':'🌱'}</span><div class="skill-body"><strong>${esc(({count:'Đếm số lượng',addition:'Phép cộng',vocab:'Từ vựng',habitat:'Môi trường sống',plants:'Thực vật',patterns:'Nhận biết quy luật',sequence:'Trình tự'}[k]||k))}</strong><small>${s.correct} câu đúng trên ${s.seen} lần trả lời · ${s.mastery>=80?'Đang rất tốt':'Tiếp tục luyện tập nhé'}</small><div class="skill-meter"><div style="width:${s.mastery}%"></div></div></div><strong>${s.mastery}%</strong></div>`).join(''):'<div class="empty">🌼 Bé hãy chơi bài đầu tiên để bắt đầu ghi nhận tiến bộ nhé!</div>'}</section><div class="section-head"><h2>📘 Gợi ý cho phụ huynh</h2></div><section class="panel"><p style="margin:0;font-size:13px;color:var(--muted)">Tỷ lệ đúng là chỉ số tham khảo. Để đánh giá ghi nhớ, hãy cho bé làm lại câu hỏi tương tự sau vài ngày và quan sát khả năng giải thích bằng lời của bé.</p></section>`}
function renderProfile(){app.innerHTML=`${head('Góc cài đặt','Thiết lập trải nghiệm phù hợp cho bé')}<section class="panel"><div class="profile-row"><label for="age">Nhóm tuổi</label><select id="age"><option value="5-6" ${state.settings.age==='5-6'?'selected':''}>5–6 tuổi</option><option value="7-8" ${state.settings.age==='7-8'?'selected':''}>7–8 tuổi</option><option value="9-10" ${state.settings.age==='9-10'?'selected':''}>9–10 tuổi</option><option value="5-8" ${state.settings.age==='5-8'?'selected':''}>5–8 tuổi</option></select></div><div class="profile-row"><label for="sound">Âm thanh hướng dẫn</label><input id="sound" type="checkbox" ${state.settings.sound?'checked':''}></div><div class="profile-row"><label for="largeText">Chữ lớn</label><input id="largeText" type="checkbox" ${state.settings.largeText?'checked':''}></div><button class="primary full" data-action="saveSettings">Lưu cài đặt</button><button class="secondary full" data-action="reset">Đặt lại tiến độ trên thiết bị này</button></section><section class="panel" style="margin-top:12px"><strong>🔒 Riêng tư và an toàn</strong><p style="font-size:13px;color:var(--muted)">Bản MVP lưu tiến độ cục bộ trên thiết bị. Chưa có tài khoản, quảng cáo hay đồng bộ đám mây. Phụ huynh nên hỗ trợ trẻ khi sử dụng.</p></section>`}
function back(){if(screen==='game'){screen='learn'}else if(screen==='world'){screen='home'}else if(screen==='result'){screen='home'}else screen='home';render()}
document.addEventListener('click',e=>{
 const navBtn=e.target.closest('[data-tab]');if(navBtn){nav(navBtn.dataset.tab);return}
 const world=e.target.closest('[data-world]');if(world){selectedWorld=world.dataset.world;screen='world';render();return}
 const lesson=e.target.closest('[data-lesson]');if(lesson){startLesson(lesson.dataset.lesson);return}
 const answerBtn=e.target.closest('[data-answer]');if(answerBtn){answer(Number(answerBtn.dataset.answer));return}
 const action=e.target.closest('[data-action]');if(!action)return;
 switch(action.dataset.action){
  case 'back':back();break;
  case 'start':nav('learn');break;
  case 'progress':nav('progress');break;
  case 'home':nav('home');break;
  case 'hint':showHint();break;
  case 'next':nextQuestion();break;
  case 'quit':if(confirm('Bé muốn tạm dừng bài này chứ? Tiến độ các câu đã trả lời vẫn được lưu.')){screen='learn';render()}break;
  case 'replay':startLesson(currentLesson.id);break;
  case 'nextLesson':nav('learn');break;
  case 'saveSettings':state.settings.age=$('#age').value;state.settings.sound=$('#sound').checked;state.settings.largeText=$('#largeText').checked;save();document.body.classList.toggle('large-text',state.settings.largeText);toast('Đã lưu cài đặt!');nav('home');break;
  case 'reset':if(confirm('Xóa toàn bộ tiến độ trên thiết bị này? Hành động này không thể hoàn tác.')){state=fresh();save();nav('home');toast('Đã đặt lại tiến độ')}break;
 }
});
$('#profileBtn').addEventListener('click',()=>{screen='profile';render()});
document.addEventListener('keydown',e=>{if(screen==='game'&&['1','2','3','4'].includes(e.key)){const b=document.querySelectorAll('[data-answer]')[Number(e.key)-1];if(b&&!b.disabled)b.click()}});
const style=document.createElement('style');style.textContent='.large-text body,.large-text button,.large-text p{font-size:1.08em!important}';document.head.append(style);
render();
})();