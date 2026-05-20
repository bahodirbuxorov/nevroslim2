import { normalizeOrderPayload, sendToTelegram, sendToBitrix } from '../utils/gateway';

function readEnv(event: any, key: string): string {
	const cfEnv = (event?.context?.cloudflare?.env ?? {}) as Record<string, string | undefined>;
	const procEnv = (typeof process !== 'undefined' ? process.env : {}) as Record<string, string | undefined>;
	return cfEnv[key] || procEnv[key] || '';
}

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const packet = normalizeOrderPayload(body ?? {});
	const runtime = useRuntimeConfig(event);

	const config = {
		telegramBotToken: runtime.telegramBotToken || readEnv(event, 'NUXT_TELEGRAM_BOT_TOKEN'),
		telegramChatId: runtime.telegramChatId || readEnv(event, 'NUXT_TELEGRAM_CHAT_ID'),
		bitrixWebhookUrl: runtime.bitrixWebhookUrl || readEnv(event, 'NUXT_BITRIX_WEBHOOK_URL'),
	};

	if (!packet.name || packet.phone.length < 5) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Invalid order payload',
			data: {
				success: false,
				message: "Ma'lumotlar noto'g'ri yuborildi",
			},
		});
	}

	if (!config.telegramBotToken || !config.telegramChatId) {
		console.error('[Order API] Missing Telegram env vars', {
			hasToken: Boolean(config.telegramBotToken),
			hasChatId: Boolean(config.telegramChatId),
			hasCfContext: Boolean(event?.context?.cloudflare?.env),
		});
	}

	const results = await Promise.allSettled([
		sendToTelegram(packet, config),
		sendToBitrix(packet, config),
	]);

	results.forEach((res, index) => {
		if (res.status === 'rejected') {
			const type = index === 0 ? 'Telegram' : 'Bitrix';
			console.error(`[Order API] ${type} integration failed:`, res.reason);
		}
	});

	return { success: true, message: "Murojaat qabul qilindi!" };
});
