import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const categorizeText = async (text: string): Promise<string> => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        命令書:
        あなたは、市民の意見を分析し、カテゴリ分けする行政の専門家です。
        以下の制約条件と入力文をもとに、一致するカテゴリを三つまで回答してください。
        
        制約条件:
        ・以下のカテゴリで分類する。
        医療・福祉 
        買物・飲食 
        住宅環境 
        移動・交通 
        遊び・娯楽 
        子育て 
        初等・中等教育 
        地域行政 
        デジタル生活 
        公共空間 
        都市景観 
        自然景観 
        自然の恵み 
        環境共生 
        自然災害 
        事故・犯罪 
        地域とのつながり 
        多様性と寛容性 
        自己効力感 
        健康状態 
        文化・芸術 
        教育機会の豊かさ 
        雇用・所得 
        事業創造 
      
      # 入力文:
      ${text}
      `,
      },
    ],
    model: 'gpt-4',
  });

  return completion.choices[0].message.content as string;
};
