import { normalizeOrderPayload, sendToTelegram, sendToBitrix } from '../utils/gateway';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const packet = normalizeOrderPayload(body ?? {});
	const config = useRuntimeConfig(event);

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

	const results = await Promise.allSettled([
		sendToTelegram(packet, config),
		sendToBitrix(packet, config),
	]);

	// Log failures for debugging
	results.forEach((res, index) => {
		if (res.status === 'rejected') {
			const type = index === 0 ? 'Telegram' : 'Bitrix';
			console.error(`[Order API] ${type} integration failed:`, res.reason);
		}
	});

	return { success: true, message: "Murojaat qabul qilindi!" };
});
