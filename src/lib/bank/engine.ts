import { gap, mcq, tf, tfng, type Question } from "@/lib/content/types";
import type { BankTest, Topic } from "./types";

function vocabQs(t: Topic): Question[] {
  return t.vocab.slice(0, 10).flatMap((v, i) => {
    const qs: Question[] = [
      mcq(
        `${t.id}-v-${i}a`,
        `"${v.word}" nghĩa gần nhất?`,
        shuffle(t.id + v.word, [v.vi, ...t.vocab.filter((x) => x.word !== v.word).slice(0, 3).map((x) => x.vi)]),
        v.vi,
        `${v.word}: ${v.vi}. ${v.example}`,
      ),
    ];
    if (v.trap) {
      qs.push(tf(`${t.id}-v-${i}b`, v.trap.replace(/^Không/, "Được phép").includes("Được") ? v.trap : v.trap, "False", v.trap));
    }
    return qs;
  }).slice(0, 10);
}

function chunkQs(t: Topic): Question[] {
  return t.chunks.map((c, i) =>
    mcq(`${t.id}-c-${i}`, `Cụm đúng cho «${c.vi}»?`, shuffle(t.id + c.chunk, [c.chunk, c.wrong, c.wrong.replace(/ /g, " the "), c.chunk.split(" ").reverse().join(" ")]), c.chunk, `${c.chunk} = ${c.vi}.`),
  );
}

function grammarQs(t: Topic): Question[] {
  const w0 = t.vocab[0]?.word ?? "policy";
  const w1 = t.vocab[1]?.word ?? "evidence";
  const w2 = t.vocab[2]?.word ?? "increase";
  return [
    mcq(`${t.id}-g1`, `There is substantial ______ on this topic.`, [w1, w1 + "s", "an " + w1, "many " + w1], w1.endsWith("s") ? w1 : w1, "Chọn dạng không đếm/đúng collocation từ chủ đề."),
    mcq(`${t.id}-g2`, `A marked ______ was reported.`, ["increase", "increasing", "increased", "increases"], "increase", "a marked increase = collocation Task 1."),
    mcq(`${t.id}-g3`, `Although the ${w0} is costly, ______ it works.`, ["but", "however", ",", "and but"], ",", "Although không đi với but/however trong cùng mệnh đề. Chỉ cần phẩy."),
    gap(`${t.id}-g4`, `This ______ a threat if it is ignored. (pose)`, "poses", "pose a threat, ngôi 3 hiện tại."),
    mcq(`${t.id}-g5`, `Câu hedging nào sạch hơn?`, [`This will definitely fix ${t.vi}.`, `This might reduce the problem if it is enforced.`, `In today's modern society ${w2} is important.`, `There are two sides.`], "This might reduce the problem if it is enforced.", "might + điều kiện = band 7–8."),
    mcq(`${t.id}-g6`, `I ______ this issue last year.`, ["have seen", "saw", "have saw", "seen"], "saw", "last year → Past Simple."),
    tf(`${t.id}-g7`, `Evidence thường đếm được: an evidence, two evidences.`, "False", "evidence không đếm."),
    mcq(`${t.id}-g8`, `The government should ______ ${w0}.`, ["to improve", "improve", "improves", "improving"], "improve", "should + V nguyên mẫu."),
  ];
}

function mixedQs(t: Topic): Question[] {
  return [...vocabQs(t).slice(0, 4), ...chunkQs(t).slice(0, 2), ...t.listenQs.slice(0, 2), ...t.readQs.slice(0, 2), ...grammarQs(t).slice(0, 2)].slice(0, 12);
}

function shuffle(seed: string, arr: string[]) {
  const a = [...new Set(arr.filter(Boolean))];
  while (a.length < 4) a.push(a[0] + " (?)");
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const out = a.slice(0, 4);
  for (let i = out.length - 1; i > 0; i--) {
    h = (h * 1664525 + 1013904223) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function testsFromTopic(t: Topic): BankTest[] {
  const base = { topicId: t.id, topic: t.vi, vocab: t.vocab };
  const tfngQs = t.claims.map((c, i) => tfng(`${t.id}-n${i}`, c.prompt, c.answer, c.why));
  return [
    { ...base, id: `${t.id}-vocab`, title: `${t.vi}: 10 từ trong ngữ cảnh`, kind: "vocab", minutes: 8, questions: vocabQs(t) },
    { ...base, id: `${t.id}-chunk`, title: `${t.vi}: collocation`, kind: "collocation", minutes: 8, questions: chunkQs(t) },
    { ...base, id: `${t.id}-listen`, title: `${t.vi}: nghe`, kind: "listen", minutes: 12, script: t.script, questions: t.listenQs },
    { ...base, id: `${t.id}-read`, title: `${t.vi}: đọc`, kind: "read", minutes: 14, passage: t.passage, questions: t.readQs },
    { ...base, id: `${t.id}-grammar`, title: `${t.vi}: ngữ pháp trong chủ đề`, kind: "grammar", minutes: 10, questions: grammarQs(t) },
    { ...base, id: `${t.id}-tfng`, title: `${t.vi}: True / False / Not Given`, kind: "tfng", minutes: 10, passage: t.passage, questions: tfngQs },
    { ...base, id: `${t.id}-speak`, title: `${t.vi}: nói`, kind: "speak", minutes: 12, speak: t.speak },
    { ...base, id: `${t.id}-write`, title: `${t.vi}: viết`, kind: "write", minutes: t.write.task === 1 ? 20 : 40, write: t.write },
    { ...base, id: `${t.id}-mixed`, title: `${t.vi}: đề tổng hợp`, kind: "mixed", minutes: 15, questions: mixedQs(t), passage: t.passage, script: t.script },
    {
      ...base,
      id: `${t.id}-hw`,
      title: `${t.vi}: bài tập về nhà`,
      kind: "homework",
      minutes: 20,
      homework: true,
      questions: mixedQs(t),
      write: t.write,
      speak: t.speak,
      passage: t.passage,
    },
  ];
}
