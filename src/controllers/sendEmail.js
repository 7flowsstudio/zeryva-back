import { env } from "../utils/env.js";
import { TEMPLATES_DIR } from "../constants/index.js";
import handlebars from "handlebars";
import path from "node:path";
import fs from "node:fs/promises";
import { sendEmail } from "../utils/sendMail.js";

export const sendEmailController = async (req, res) => {
	console.log(req.body);
	await requestSendBody(req.body); // передаємо весь об'єкт
	res.json({
		message: "Order was successfully sent to email!",
		status: 200,
		data: {},
	});
};

export const requestSendBody = async ({ name, phone }) => {
	const templatePath = path.join(TEMPLATES_DIR, "order-confirmation.html");

	const templateSource = (await fs.readFile(templatePath)).toString();

	const template = handlebars.compile(templateSource);
	const html = template({
		name: name,
		phone: phone,
	});

	await sendEmail({
		from: env("SMTP_FROM"),
		to: env("SMTP_OWNER_EMAIL"),
		subject: "Ваш новый клиент!",
		html,
	});
};
