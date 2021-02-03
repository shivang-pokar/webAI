# webAI

Hello geeks out there we are introducing webAI beta 1.0 using this you set voice command in you site 

<blockquote>
<p><strong>PLEASE NOTE:</strong> for not this not working on mobile</p>
</blockquote>


## Usage

```js

new webAI({
    /* Timeout to set ideal */
      timeOut: 6,
      /* To active command */
      baseCommand: "Hello",
      /* command list in array */
      command: [
        {
          /* Here you can set command */
          actionCommand: ['go to contact'],
          type: 'url',
          pageSlug: 'contact.html'
        },
        {
          actionCommand: ['Show Alert','Alert'],
          type: 'action',
          /* After success you will get callback to perform any action */
          callback: (event) => {
            alert(event.actionCommand)
          }
        },
        {
          actionCommand: ['search'],
          type: 'action',
          callback: (event) => {
            document.getElementById('messages').innerHTML = event.actionCommand.replace('search', '').trim();
          }
        }
      ],
      /* Your site URL */
      siteUrl: 'https://siteurl.com'
});

```

### Functions

| Functions | Description |
| --- | --- |
| `timeOut` | After active this will work 6 second |
| `baseCommand` | To active your voice command |
| `command` | using command you can all comannd you want |
| `siteUrl` | Set your site path so that will yous to redirect |


## If you Like

Give a ⭐️ if this App helped you!


__Authors__:  [Shivang Pokar](https://github.com/shivang-pokar)