
const qtyWords=['g','kg','ml','cc','大さじ','小さじ','個','丁','本','枚','少々','適量'];
const stepWords=['焼','煮','炒','混','加','茹','切','漬'];

function parseRecipe(){
 const lines=document.getElementById('raw').value.split('\n');
 let ing=[],st=[],nt=[];
 lines.forEach(l=>{
  if(qtyWords.some(w=>l.includes(w))) ing.push(l);
  else if(stepWords.some(w=>l.includes(w))) st.push(l);
  else if(l.trim()) nt.push(l);
 });
 ingredients.value=ing.join('\n');
 steps.value=st.map((x,i)=>`${i+1}. ${x}`).join('\n');
 notes.value=nt.join('\n');
}

function saveRecipe(){
 const data=JSON.parse(localStorage.getItem('recipes')||'[]');
 data.push({
  title:title.value,
  ingredients:ingredients.value,
  steps:steps.value,
  notes:notes.value
 });
 localStorage.setItem('recipes',JSON.stringify(data));
 render();
}

function render(){
 const data=JSON.parse(localStorage.getItem('recipes')||'[]');
 recipes.innerHTML=data.map(r=>`
 <div class="card">
 <h3>${r.title}</h3>
 <b>材料</b><pre>${r.ingredients}</pre>
 <b>工程</b><pre>${r.steps}</pre>
 <b>メモ</b><pre>${r.notes}</pre>
 </div>`).join('');
}
render();
