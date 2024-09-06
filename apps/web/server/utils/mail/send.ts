import { useCompiler } from "#vue-email";
import { getProvider } from "mail/provider";
import { mailTemplates } from "mail/util/templates";

export const sendEmail = async <TemplateId extends keyof typeof mailTemplates>({
  to,
  templateId,
  context,
}: {
  to: string;
  templateId: TemplateId;
  context?: any;
}) => {
  const templateData = mailTemplates[templateId];

  const template = await useCompiler(templateData.name, {
    props: context,
  });

  try {
    const { send } = await getProvider();

    await send({
      to,
      subject: templateData.subject,
      text: template.text,
      html: template.html,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
