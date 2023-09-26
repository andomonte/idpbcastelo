const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const { musicas } = req.body;

  if (musicas) {
    try {
      const YOUTUBE_PLAYLIST_ITEMS_API =
        'https://www.googleapis.com/youtube/v3/search';

      const result = await fetch(
        `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=2&index=1&key=AIzaSyBxqTbtKdJP3jX-k7yRiSbRi7rG40qfwqA&type=video&q=${musicas}`,
      );
      const data = await result.json();
      res.status(200).send(data);
    } catch (errors) {
      console.log(errors);
      res.status(400).send('vou criar o banco');
    }
  }
};
//= =========================================================================

export default handler;
