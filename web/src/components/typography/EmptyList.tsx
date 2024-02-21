type Props = {
  text: string;
};

export default function EmptyList({ text }: Props) {
  return (
    <span
      style={{
        width: '100%',
        textAlign: 'center',
        fontStyle: 'italic',
        opacity: '0.5',
        padding: '1rem 0 0 0',
      }}>
      {text}
    </span>
  );
}
