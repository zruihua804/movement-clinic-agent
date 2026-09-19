// Replace these read-only adapters with remote tools. Workflow alone authorizes mutations.
export const providers=[{id:'lin',name:'林悦医生',role:'运动医学 · 初诊评估'},{id:'chen',name:'陈晨 PT',role:'物理治疗 · 术后康复'},{id:'zhou',name:'周宁 PT',role:'物理治疗 · 运动回归'}];
export function makeSlots(){return providers.flatMap(p=>[1,2,3].flatMap(day=>['09:00','14:00','16:00'].map(time=>{const d=new Date();d.setDate(d.getDate()+day);const date=d.toLocaleDateString('sv-SE');return {id:`${p.id}-${date}-${time}`,provider:p.id,date,time};})));}
export const insuranceTool={check(company,plan){if(/aetna/i.test(company)&&/international/i.test(plan))return 'covered';if(/bupa|不支持/i.test(company))return 'unsupported';return 'manual';}};
export const conversationAdapter={classify(text){if(/术后|ACLR|手术|转诊/i.test(text))return 'postop';if(/舟骨|不愈合|少见|不确定/.test(text))return 'review';if(/PT|林悦|陈晨|周宁|指定/i.test(text))return 'provider';if(/扭伤|跑步|膝|肩|踝|运动损伤/.test(text))return 'common';return 'review';},isRisk(text){return /急性.*肿胀|突然.*肿|呼吸困难|胸痛|剧烈|大出血|高热/.test(text);},isComplaint(text){return /投诉|人工|不满意/.test(text);}};
// Future boundary: Dify/LangGraph/n8n may propose intent + fields; validate before workflow commands.
// Chatwoot webhook -> receive(case,text); outbound messages <- case.messages.
