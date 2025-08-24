import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { text } = await req.json()
    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }

    const endpoint =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

    const body = {
      contents: [
        {
          parts: [
            {
              text: `You are an expert in corporate communications and professionalism. Your task is to transform any given casual, rude, or unprofessional text into polished, respectful, and formal business language. Ensure the rewritten text conveys the exact same meaning and intent, but in a tone that is acceptable for workplace communication, internal memos, or external client correspondence. You don't have to format anything, or add unnecessary stuff to the output, just return plaintext.\n\nText:\n${text}`,
            },
          ],
        },
      ],
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const errText = await res.text()
      return NextResponse.json(
        { error: 'Gemini API error', details: errText },
        { status: 502 }
      )
    }

    const data = await res.json()

    let generated = ''
    try {
      const content =
        data?.candidates?.[0]?.content ||
        data?.output?.[0]?.content ||
        data?.results?.[0]?.content

      if (typeof content === 'string') {
        generated = content
      } else if (Array.isArray(content)) {
        generated = content.map((c) => c?.text || '').join('\n')
      } else {
        const s = JSON.stringify(data)
        const found = /"text"\s*:\s*"([^"]+)"/.exec(s)
        generated = found ? found[1] : ''
      }
    } catch (e) {
      generated = ''
    }

    // ✅ Trim extra whitespace/newlines
    generated = generated
        .replace(/\\n/g, '\n')
        .replace(/\s+$/g, '')
        .trim()

    return NextResponse.json({ result: generated || data })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
