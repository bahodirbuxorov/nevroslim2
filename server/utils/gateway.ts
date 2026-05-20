export interface OrderPayload {
	name: string;
	phone: string;
	region?: string;
	purpose?: string;
	purpose_label?: string;
	problems?: string[];
	utm_source?: string;
	utm_medium?: string;
}

export function normalizeOrderPayload(body: Record<string, unknown>): OrderPayload {
	const rawName = typeof body.name === 'string' ? body.name : '';
	const rawPhone = typeof body.phone === 'string' ? body.phone : '';
	const purifiedDigits = rawPhone.replace(/\D/g, '');

	const region = typeof body.region === 'string' && body.region.trim() ? body.region.trim() : undefined;
	const purpose = typeof body.purpose === 'string' ? body.purpose : undefined;
	const purpose_label = typeof body.purpose_label === 'string' ? body.purpose_label : undefined;
	const problems = Array.isArray(body.problems) ? body.problems.filter((p): p is string => typeof p === 'string') : undefined;
	const utm_source = typeof body.utm_source === 'string' ? body.utm_source : undefined;
	const utm_medium = typeof body.utm_medium === 'string' ? body.utm_medium : undefined;

	return {
		name: rawName.trim(),
		phone: `+${purifiedDigits}`,
		region,
		purpose,
		purpose_label,
		problems,
		utm_source,
		utm_medium,
	};
}

export async function sendToTelegram(
	payload: OrderPayload,
	config: { telegramBotToken: string; telegramChatId: string },
) {
	const lines = [
		'🟢 Nevroslim 2 +',
		'📋 Янги мурожаат!',
		'',
		`👤 Исм: ${payload.name}`,
		`📞 Телефон: ${payload.phone}`,
	];

	if (payload.region) {
		lines.push(`📍 Вилоят: ${payload.region}`);
	}

	if (payload.purpose_label) {
		lines.push('', `📌 Мақсад: ${payload.purpose_label}`);
	}

	if (payload.problems && payload.problems.length > 0) {
		lines.push('', '❗️ Муаммолар:');
		payload.problems.forEach(p => lines.push(`   • ${p}`));
	}

	if (payload.utm_medium) {
		lines.push('', `📢 ${payload.utm_medium}`);
	}

	const text = lines.join('\n');

	return await $fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
		method: 'POST',
		body: {
			chat_id: config.telegramChatId,
			text,
		},
	});
}

export async function sendToBitrix(
	payload: OrderPayload,
	config: { bitrixWebhookUrl: string },
) {
	const leadTitle = `Nevroslim/Telegram - ${payload.name}`;

	const fields: Record<string, unknown> = {
		TITLE: leadTitle,
		NAME: payload.name,
		PHONE: [{ VALUE: payload.phone, VALUE_TYPE: 'WORK' }],
		SOURCE_ID: 'UC_YOX5UO',
	};

	if (payload.region) {
		fields.COMMENTS = `Вилоят: ${payload.region}`;
	}

	if (payload.purpose_label) {
		const existing = typeof fields.COMMENTS === 'string' ? fields.COMMENTS + '\n' : '';
		fields.COMMENTS = existing + `Мақсад: ${payload.purpose_label}`;
	}

	if (payload.problems && payload.problems.length > 0) {
		const existing = typeof fields.COMMENTS === 'string' ? fields.COMMENTS + '\n' : '';
		fields.COMMENTS = existing + `Муаммолар: ${payload.problems.join(', ')}`;
	}

	return await $fetch(`${config.bitrixWebhookUrl}crm.lead.add.json`, {
		method: 'POST',
		body: { fields },
	});
}
