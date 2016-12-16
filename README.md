# apl-backend

## Linux prereqs
```
sudo apt-get install mongodb-server python3 python3-dev python3-virtualenv ffmpegthumbnailer
```

## Mac prereqs
```
brew install mongodb python3 ffmpegthumbnailer libmagic
pip3 install -U pip virtualenv
brew services start mongodb
```

## Install project
```
cd ~/projects
git clone git://github.com/penmark/apl-backend.git
cd apl-backend
npm i
mkdir -p ~/.virtualenv
virtualenv --python=python3 ~/.virtualenv/apl
. ~/.virtualenv/apl/bin/activate
pip install -U pip
pip install git+https://github.com/penmark/s3-wrapper.git@1.0.2#egg=s3_wrapper
pip install git+https://github.com/penmark/ingest.git@1.0.2#egg=ingest
cat > .env <<EOF;
MONGO_URI=mongodb://localhost/media
MONGO_COLLECTION=asset
S3_BUCKET=<bucket>
S3_ACCESS_KEY=<access key>
S3_SECRET_KEY=<secret key>
S3_SSL=true
EOF

# edit .env file and add s3 info
npm start
```

## Ingest
```
ingest ~/Movies/some_movie.mp4
```
