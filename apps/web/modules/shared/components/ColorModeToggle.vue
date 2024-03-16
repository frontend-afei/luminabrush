<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button data-test="color-mode-toggle" variant="ghost" size="icon">
        <ColorModeToggleIcon />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <ColorModeToggleRadioGroup />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
