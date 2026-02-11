
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = envConfig.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Error: Missing Supabase URL or Service Role Key in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

async function migrateUsers() {
  console.log(`Found ${users.length} users to migrate...`);

  for (const user of users) {
    try {
      console.log(`Migrating user: ${user.username} (${user.email})...`);
      
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: { username: user.username }
      });

      if (error) {
        console.error(`Failed to create user ${user.username}:`, error.message);
      } else {
        console.log(`Successfully created user: ${user.username} (ID: ${data.user.id})`);
      }
    } catch (err) {
      console.error(`Unexpected error migrating ${user.username}:`, err);
    }
  }

  console.log('Migration complete.');
}

migrateUsers();
