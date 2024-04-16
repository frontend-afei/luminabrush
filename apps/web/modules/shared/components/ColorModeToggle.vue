<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <ColorModeToggleIcon />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <ColorModeToggleRadioGroup />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
