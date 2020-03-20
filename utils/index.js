export const camel2title = (camelCase) => camelCase
.replace(/([A-Z])/g, (match) => ` ${match}`)
.replace(/^./, (match) => match.toUpperCase());