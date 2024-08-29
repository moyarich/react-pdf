export const formatText = (text: string) => {
  return text.replace(/\\n/g, '&nbsp;\n').replace(/^"|"$/g, '')
}
