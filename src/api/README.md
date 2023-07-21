# Generated with

```bash
curl -X POST https://generator3.swagger.io/api/generate -H 'Content-Type: application/json' -d '{ 
  "specURL" : "https://tourism.api.opendatahub.com/swagger/v1/swagger.json",
  "lang" : "typescript-axios",
  "type" : "CLIENT",
  "codegenVersion" : "V3",
  "options": {
    "modelPropertyNaming": "original"
  }
}' --output tourism.zip
```

However modelPropertyNaming seems not to work so model fields are renamed with:

```bash
sed -i -r 's/^(\s+\b)(.)(.*)$/\1\u\2\3/' models/*.ts
```
