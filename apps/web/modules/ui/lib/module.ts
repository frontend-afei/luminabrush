import {
  addComponent,
  addComponentsDir,
  defineNuxtModule,
  tryResolveModule,
} from "nuxt/kit";

export default defineNuxtModule({
  async setup() {
    const isVeeValidateExist = await tryResolveModule("vee-validate");

    addComponentsDir({
      path: "@/modules/ui/components",
      extensions: [".vue"],
      prefix: "",
      pathPrefix: false,
    });

    if (isVeeValidateExist !== undefined) {
      addComponent({
        filePath: "vee-validate",
        export: "Form",
        name: `Form`,
        priority: 999,
      });

      addComponent({
        filePath: "vee-validate",
        export: "Field",
        name: `FormField`,
        priority: 999,
      });
    }

    addComponent({
      filePath: "radix-vue",
      export: "PaginationRoot",
      name: `Pagination`,
      priority: 999,
    });

    addComponent({
      filePath: "radix-vue",
      export: "PaginationList",
      name: `PaginationList`,
      priority: 999,
    });

    addComponent({
      filePath: "radix-vue",
      export: "PaginationListItem",
      name: `PaginationListItem`,
      priority: 999,
    });

    addComponent({
      filePath: "radix-vue",
      export: "ToastProvider",
      name: `ToastProvider`,
      priority: 999,
    });

    addComponent({
      filePath: "radix-vue",
      export: "TabsRoot",
      name: `TabsRoot`,
      priority: 999,
    });

    //   { name: "DialogRoot" },
    // { name: "DialogPortal" },
    // { name: "DialogTrigger" },

    // /* Sheet (Dialog) */
    // { name: "DialogRoot", as: "SheetRoot" },
    // { name: "DialogPortal", as: "SheetPortal" },
    // { name: "DialogTrigger", as: "SheetTrigger" },

    // /** DropdownMenu */
    // { name: "DropdownMenuRoot" },
    // { name: "DropdownMenuPortal" },
    // { name: "DropdownMenuTrigger" },
    // { name: "DropdownMenuGroup" },
    // { name: "DropdownMenuRadioGroup" },
    // { name: "DropdownMenuSub" },

    // /** Select */
    // { name: "SelectRoot" },
    // { name: "SelectGroup" },
    // { name: "SelectValue" },
  },
});
