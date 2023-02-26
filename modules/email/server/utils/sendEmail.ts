import { createTransport } from 'nodemailer'
import { parseMjmlTemplate } from './parseMjmlTemplate'

export const sendEmail = async (params: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  templateId?: string;
  context?: Record<string, unknown>;
}) => {
  try {
    const runtimeConfig = useRuntimeConfig()
    if (!runtimeConfig.email.server || !runtimeConfig.email.from) {
      throw new Error('runtimeConfig.email.server and or runtimeConfig.email.from not configured')
    }

    const { to, subject, text, context, templateId } = params
    let { html } = params

    if (templateId) {
      const template = parseMjmlTemplate(templateId)
      html = template ?? html
    }

    // replace the placeholders in the html with the context
    if (context) {
      Object.keys(context).forEach((key) => {
        html = html?.replaceAll(`{{${key}}}`, context[key] as string)
      })
    }

    // create the transporter
    const transporter = createTransport({
      ...runtimeConfig.email.server
    })

    // send the email
    await transporter.sendMail({
      to,
      from: runtimeConfig.email.from,
      subject,
      text,
      html
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
