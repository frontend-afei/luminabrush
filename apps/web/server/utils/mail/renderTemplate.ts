import { mailTemplates } from 'mail/util/template'
import { useCompiler } from '#vue-email'

/**
 * @TODO @temporary This util can be removed when moving email templates to `packages/mail/emails`
 * @see packages/mail/util/send.ts
 */
export const renderTemplate = async <TemplateId extends keyof typeof mailTemplates>(params: {
	templateId: TemplateId
	// @TODO
	props?: any
}) => {
	const templateName = mailTemplates[params.templateId]

	const template = await useCompiler(
		templateName,
		{
			props: params.props,
		},
		// logs
		process.env.NODE_ENV === 'production' ? false : true
	)

	return template
}
