# apl-backend

## Linux prereqs
```
sudo apt install mongodb-server python3 python3-dev python3-virtualenv ffmpegthumbnailer \
libxml2-dev libxslt1-dev build-essential
```

## Mac prereqs
```
brew install mongodb python3 ffmpegthumbnailer libmagic
pip3 install -U pip virtualenv
brew services start mongodb
```

## Project setup

Clone the repository:
```
git clone git://github.com/penmark/apl-backend.git
cd apl-backend
```

Install node dependencies:
```
npm i
```

Create and activate a python virtual environment:
```
mkdir -p ~/.virtualenv
virtualenv --python=python3 ~/.virtualenv/apl
. ~/.virtualenv/apl/bin/activate
```

Install python dependencies:
```
pip install -U pip
pip install git+https://github.com/penmark/s3-wrapper.git@1.0.2#egg=s3_wrapper
pip install git+https://github.com/penmark/ingest.git@1.0.2#egg=ingest
```

Create a file with environment variables; run the following as a single command:
```
cat > .env <<EOF;
MONGO_URI=mongodb://localhost/media
MONGO_COLLECTION=asset
S3_BUCKET=<bucket>
S3_ACCESS_KEY=<access key>
S3_SECRET_KEY=<secret key>
S3_SSL=true
EOF
```

Finally, edit the .env file we've just created and update the following lines with the correct values:
```
S3_BUCKET=<bucket>
S3_ACCESS_KEY=<access key>
S3_SECRET_KEY=<secret key>
```

## Ingesting assets
The apl-backend is able to ingest local media files, the following command will ingest `~/Movies/some_movie.mp4`:
```
ingest ~/Movies/some_movie.mp4
```

## Serving assets
The apl-backend is able serve ingested media over http, the following command will start the server:
```
npm start
```
