export function useUtmParams() {
	function capture() {
		if (!import.meta.client) return;
		const params = new URLSearchParams(window.location.search);
		const source = params.get('utm_source');
		const medium = params.get('utm_medium');
		const pathname = window.location.pathname;

		const stored = get();
		if (!stored.utm_source && source) sessionStorage.setItem('utm_source', source);
		if (!stored.utm_medium && medium) sessionStorage.setItem('utm_medium', medium);

		if (pathname && pathname !== '/') {
			if (!sessionStorage.getItem('source_direction')) {
				let direction = pathname;
				// Extract the last part if it's something like /thanks/303 -> /303
				const match = pathname.match(/\/[^\/]+$/);
				if (match) {
					direction = match[0];
				}
				sessionStorage.setItem('source_direction', direction);
			}
		}
	}

	function get(): { utm_source?: string; utm_medium?: string; source_direction?: string } {
		if (!import.meta.client) return {};
		const source = sessionStorage.getItem('utm_source') || undefined;
		const medium = sessionStorage.getItem('utm_medium') || undefined;
		const source_direction = sessionStorage.getItem('source_direction') || undefined;
		
		const result: { utm_source?: string; utm_medium?: string; source_direction?: string } = {};
		if (source) result.utm_source = source;
		if (medium) result.utm_medium = medium;
		if (source_direction) result.source_direction = source_direction;
		return result;
	}

	return { capture, get };
}
