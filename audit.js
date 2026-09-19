// Immutable, public execution receipts. Never model reasoning or inferred historical calls.
export function receipt(c,kind,title,from,to,request,response,status='done'){
 c.receipts??=[];
 const r={id:crypto.randomUUID(),time:new Date().toISOString(),kind,title,from,to,request:structuredClone(request),response:structuredClone(response),status};
 c.receipts.push(r);return r;
}
export function fieldSnapshot(c){return {患者:c.name,Case:c.id,患者意图:c.intent,已收集资料:structuredClone(c.fields),费用方式:c.insurance?'保险核验':'自费'};}
export function doctorTask(c){const pending=c.receipts?.findLast(r=>r.kind==='doctor'&&r.status==='waiting');if(pending)return;
 const round=(c.receipts||[]).filter(r=>r.kind==='doctor'&&r.title.startsWith('医疗审核任务')).length+1;
 receipt(c,'doctor',`医疗审核任务 · 第 ${round} 轮`,'Front Desk AI','医疗审核组 · 模拟工作收件箱',{...fieldSnapshot(c),联系对象:'林悦医生 · 运动医学审核值班',联系渠道:'诊所内部协作会话（模拟）',请求:'请审核患者是否适合本机构接诊，说明是否需补充资料，并匹配医生或 PT。'},{任务编号:`REV-${c.number}-${round}`,送达:'已送达本地模拟工作台',处理:'等待医生或医导打开并处理',后续:'接受 → 保险 / 排班；补资料 → 原会话追问 → 再审核；不适合 → 结束流程'},'waiting');
}
export function doctorReply(c,decision,note,provider){const task=c.receipts?.findLast(r=>r.kind==='doctor'&&r.status==='waiting');if(task){task.status='done';task.response={...task.response,处理:'已收到医疗人员回复',回复时间:new Date().toISOString(),审核结果:decision,审核意见:note,匹配人员:provider};}receipt(c,'doctor', '医疗审核结果回传','医疗审核组','Front Desk AI · 原患者会话',{关联任务:task?.response.任务编号||'旧版任务',决定:decision,意见:note,匹配人员:provider},{执行:decision==='accept'?'解除医疗审核门槛':decision==='supplement'?'请求补充资料，等待重新提交':'关闭接诊流程'});}
