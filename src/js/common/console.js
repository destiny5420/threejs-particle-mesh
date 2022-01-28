export default function () {
  const redWithDarkBackground = 'color:#f00;background-color:#181818;'
  const whiteWithDarkBackground = 'color:#fff;background-color:#181818;'

  if (window.console) {
    console.log(
      `
%c...........................
MMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMM             MMMMMMM
MMMMMMM   MMMMMMMM   MMMMMM
MMMMMMM   MMMMMMMMM  MMMMMM
MMMMMMM   MMMMMMMM   MMMMMM
MMMMMMM             MMMMMMM
MMMMMMM   MMMMMMMMMMMMMMMMM
MMMMMMM   MMM%cMMM%cMMMMMMMMMMM
MMMMMMM   MMM%cMMM%cMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMM
...........................
.                         .
.  paper.hsiao@gmail.com  .
.                         .
...........................
`,
      whiteWithDarkBackground,
      redWithDarkBackground,
      whiteWithDarkBackground,
      redWithDarkBackground,
      whiteWithDarkBackground,
    )
  }
}
