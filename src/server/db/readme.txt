# Command line command to connect to the database
#
# pscale connect recs dev --port 3309
# or
# pscale connect recs main --port 3309

You make changes to your schema on yr project then:
1. npm install (this generates prisma, whatever that means)
1b You might also have to "npx prisma format"
2. push the changes to the dev branch using: 'npx prisma db push'

Note: You can test your changes by running: 'npx prisma studio' and adding an entry

After making db schema changes and pushing them to your 'dev' branch you will want to merge your 'dev' branch with your 'main' branch. You do this with a deploy request
1. Go to the pscale gui and click on your 'dev' branch (check that the schema matches what you expect)
2. Click 'Create Deploy Request and 'deploy to' main.
3. Click Create Deploy Request
4. Go to the Deploy Request and click 'Add changes to the deploy queue'