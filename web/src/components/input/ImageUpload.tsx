import { Close, CloudUpload } from '@mui/icons-material';
import { Button, Grid, IconButton, styled } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Path } from 'react-hook-form';

type Props<F> = {
  name: Path<F>;
  defaultValue: File[] | null;
  updateImages: (name: Path<F>, file: File[] | null) => void;
};

export default function ImageUpload<F>({
  name,
  defaultValue,
  updateImages,
}: Props<F>) {
  const [images, setImages] = useState<File[] | null>(defaultValue ?? null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultValue) setImages(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (images) {
      updateImages(name, images);
    }
  }, [name, images, updateImages]);

  const _handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    let fileToLarge = false;

    if (event.target.files.length > 12) {
      alert('You can only upload twelve images');
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
      return;
    }

    Array.from(event.target.files).map(file => {
      if (file.size > 1024 * 1024 * 5) {
        fileToLarge = true;
      }
    });

    if (fileToLarge) {
      alert('Images can be no larger than 5MB each.');
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
      return;
    }

    setImages(Array.from(event.target.files));
  };

  const _removeImage = (index: number) => {
    setImages(prevImages => {
      if (!prevImages) return prevImages;
      const filteredImages = [
        ...prevImages.slice(0, index),
        ...prevImages.slice(index + 1),
      ];

      if (filteredImages.length === 0) return null;
      else return filteredImages;
    });
  };

  return (
    <Grid item xs={12} md={12}>
      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Grid container spacing="1rem">
          {images?.map((image, index) => (
            <Grid
              key={index}
              item
              xs={4}
              sm={3}
              md={2}
              style={{ position: 'relative' }}>
              <IconButton
                size="small"
                style={{
                  backgroundColor: '#333',
                  position: 'absolute',
                  top: '1.5rem',
                  right: '0.5rem',
                  zIndex: '2',
                }}
                onClick={() => _removeImage(index)}>
                <Close fontSize='inherit' />
              </IconButton>
              <PreviewImage src={URL.createObjectURL(image)} />
            </Grid>
          ))}
          {images === null ? (
            <Grid
              item
              xs={12}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '1rem',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '1rem',
              }}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUpload />}>
                Upload Images
                <VisuallyHiddenInput
                  type="file"
                  multiple
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  ref={imageInputRef}
                  onChange={_handleImagesChange}
                />
              </Button>
              <span style={{ fontSize: '0.75rem'}}>
                You can upload up to twelve images. Each image must be smaller
                than 5MB
              </span>
            </Grid>
          ) : null}
        </Grid>
      </section>
    </Grid>
  );
}

const PreviewImage = styled('img')({
  width: '100%',
  objectFit: 'contain',
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
