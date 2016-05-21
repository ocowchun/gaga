#gaga
>manage configuration with dynamodb

##usage
```bash
#show your config content
$ gaga show -t <your-dynamo-table> -i <item-id>

#save your config as config.json
$ gaga pull -t <your-dynamo-table> -i <item-id>

#push your json file to dynamo db as current item
$ gaga push -t <your-dynamo-table> -f <file>
```

[trello board](https://trello.com/b/0Vu49UAM/gaga)

MIT
