import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));

app.get('*', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath, (err) => {
            if (err && !res.headersSent) {
                res.status(500).send("Error serving index.html: " + err.message);
            }
        });
    } else {
        res.status(500).send("Build folder ('dist') not found on server. Please run 'npm run build' or upload dist folder.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));