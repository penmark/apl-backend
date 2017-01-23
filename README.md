# APL Backend
Simple node server which serves media ingested into mongdb using [ingest](https://github.com/penmark/ingest).

## Linux prereqs
(Tested on Debian Jessie)
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.4 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt update
sudo apt install mongodb-server mediainfo ffmpegthumbnailer python3 python3-dev python3-virtualenv \
libxml2-dev libxslt1-dev build-essential zlib1g-dev
```

## Mac prereqs
```
brew install mongodb python3 ffmpegthumbnailer libmagic mediainfo
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

Finally, edit the .env file we've just created and update the following lines with the correct values:
```
S3_BUCKET=<bucket>
S3_ACCESS_KEY=<access key>
S3_SECRET_KEY=<secret key>
```

## Serving assets
The apl-backend is able serve ingested media over http, the following command will start the server:
```
npm start
```

## Ingesting assets
The apl-backend is able to ingest local media files, the following command will ingest `~/Movies/some_movie.mp4`, adding media asset to mongodb and uploading the asset to S3 (if S3 is configured).
```
ingest ~/Movies/some_movie.mp4
```

Create and activate a python virtual environment:
```
mkdir -p ~/.virtualenv
virtualenv --python=python3 ~/.virtualenv/apl
. ~/.virtualenv/apl/bin/activate
```

Install python dependencies for ingester:
```
pip install -U pip
pip install git+https://github.com/penmark/s3-wrapper.git@1.0.3#egg=s3_wrapper
pip install git+https://github.com/penmark/ingest.git@1.0.5#egg=ingest
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
