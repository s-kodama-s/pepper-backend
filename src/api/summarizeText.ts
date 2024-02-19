import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const summarizeText = async (text: string): Promise<string> => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
      # 命令書:
      あなたは、住民の意見を集約し要約する人です。
      以下の制約条件と入力文をもとに、最高の要約を出力してください。
      
      # 制約条件:
      ・文字数は150文字程度。
      ・小学生にもわかりやすく。
      ・重要なキーワードを取り残さない。
      ・文章を簡潔に。
      ・話しことばを書きことばに変換するように。
      
      # 入力文:
      ${text}
      `,
      },
    ],
    model: 'gpt-4',
  });

  return completion.choices[0].message.content as string;
};
