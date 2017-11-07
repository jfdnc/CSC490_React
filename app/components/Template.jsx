export default ({ markup }) => {
	return `
    <!doctype html>
      <html>
        <head>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
				<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
				<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
				      rel="stylesheet">
        </head>
        <body>
        	<div id="root">${markup}</div>
        	<script src="/static/client.js" async></script>
        </body>
      </html>`;
};
