<template>
	<EHtml lang="en">
		<EHead>
			<EFont font-family="Plus Jakarta Sans" fallback-font-family="Arial" font-weight="400" font-style="normal" />
		</EHead>

		<!--<ETailwind :config="tailwindConfig">-->
		<ESection class="p-1">
			<EContainer class="border-border bg-card text-card-foreground rounded-lg border border-solid p-6">
				<Logo />

				<slot />
			</EContainer>
		</ESection>
		<!--</ETailwind>-->
	</EHtml>
</template>

<script setup lang="ts">
	/**
	 * We currently don't use tailwind in our emails.
	 * As soon this is resolved:
	 * @awaiting https://github.com/Dave136/vue-email/issues/72
	 * We can switch.
	 */
</script>
