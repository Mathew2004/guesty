export default function WidgetLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ marginTop: 80, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
