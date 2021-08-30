declare module '*.scss' {
  const content: { [className: string]: string }
  // noinspection JSDuplicatedDeclaration
  export default content
}

declare module '*.css' {
  const content: { [className: string]: string }
  // noinspection JSDuplicatedDeclaration
  export default content
}
