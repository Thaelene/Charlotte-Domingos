const BODY = document.querySelector('body');

if (BODY.classList.contains('gallery'))
{
  const GRID = document.querySelector('.grid');

  let msnry = new Masonry(GRID, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
    //   gutter: '.gutter-sizer'
  });

  imagesLoaded(GRID).on('progress', function() {
    // layout Masonry after each image loads
    msnry.layout();
  });
}