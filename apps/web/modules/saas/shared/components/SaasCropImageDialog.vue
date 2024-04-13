<script setup lang="ts">
  import Cropper from "cropperjs";
  import "cropperjs/dist/cropper.css";

  const props = defineProps<{
    open: boolean;
    image: File | null;
  }>();

  const emit = defineEmits<{
    openChange: [open: boolean];
    save: [croppedImageData: Blob | null];
  }>();

  const imageRef = ref<HTMLImageElement>();
  const cropper = ref<Cropper | null>();

  const onImageLoaded = () => {
    if (imageRef.value && imageRef.value.src) {
      cropper.value = new Cropper(imageRef.value, {
        aspectRatio: 1,
        viewMode: 1,
        background: false,
        autoCropArea: 1,
        guides: true,
      });
    }
  };

  watchEffect(() => {
    if (!props.open) {
      cropper.value?.destroy();
    }
  });

  const saveCroppedImageData = async () => {
    const canvas = cropper.value?.getCroppedCanvas({
      maxWidth: 512,
      maxHeight: 512,
    });
    const croppedImageData = await new Promise<Blob | null>((resolve) =>
      canvas?.toBlob(resolve),
    );

    emit("save", croppedImageData);
  };

  const imageSrc = computed(
    () => props.image && URL.createObjectURL(props.image),
  );
</script>

<template>
  <Dialog
    :open="open"
    @update:open="(value: boolean) => emit('openChange', value)"
  >
    <DialogContent>
      <DialogDescription class="sr-only"></DialogDescription>
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>
      <div class="aspect-square">
        <img
          v-if="image && imageSrc"
          ref="imageRef"
          :src="imageSrc"
          style="width: 100%"
          @load="onImageLoaded()"
        />
      </div>
      <DialogFooter>
        <Button size="sm" @click="saveCroppedImageData()">{{
          $t("settings.cropImage.save")
        }}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
