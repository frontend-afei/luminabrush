// @ts-ignore
import { config } from 'vue-email/compiler'

// Change this import to the provider you like to use
import { send } from '../provider/plunk'
import { getBaseUrl } from 'utils/lib/base-url'
import { mailTemplates } from './template'

const assetsPath =
	process.env.NODE_ENV === 'production'
		? './server/mail/emails' // see apps/web/package.json `build` script
		: '../../packages/mail/emails'

const vueEmail = config(assetsPath, {
	// TODO remove in prod
	verbose: true,
	options: {
		baseUrl: getBaseUrl(),
	},
})

export const sendEmail = async <TemplateId extends keyof typeof mailTemplates>(params: {
	to: string
	templateId: TemplateId
	// @TODO
	props?: any
}) => {
	const templateName = mailTemplates[params.templateId]

	const template = await vueEmail.render(templateName, {
		props: params.props,
	})

	try {
		await send({
			to: params.to,
			subject: 'Supastarter Nuxt', // TODO
			/** @see https://github.com/Dave136/vue-email/issues/79 */
			text: '',
			html: template,
		})

		return true
	} catch (error) {
		console.error(error)
		return false
	}
}
