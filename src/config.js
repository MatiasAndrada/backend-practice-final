 module.exports = {
    appconfig: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT
    },
    dbConfig:{
    fileSystem: {
        path: './DB/'
    },
    mongodb: {
        cnxStr: "mongodb+srv://Pichulitoo7:Pichu2909@cluster0.rfxozjp.mongodb.net/backendAppTest",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },
    firebase: {
        "type": "service_account",
        "project_id": "pichulitoo-5e382",
        "private_key_id": "6d4ca16241a590f7fc835151a2361b4199f18e3f",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFfMXtULo2LR0X\naB2xvq5P5g4dWr0AItHnmAWJpSeWxkU8Y9TNoSCp/kIzsPD+rJalejGBbaXXTkOk\nUPT+s1sj8uhjHmuogyS1nz5C61BuSgXNMjwNV34MZduE0LAcO+ZCFlErX+Q9B1oy\nph4n6lKXdCXjGZLCid9NiJ7HzfYnj7Lv7y6IFxvS42Ow/pJR4NmR1Y9iAQm/kzuY\nd1lU1zUsARTrrXNHbwQMLd3YYi6693flZdwRgyzJHYNayRjlvICkipr18LLUUn2y\ns/K5gOGBQt/+DcAOcVTQnZUk+SbUZAD2Jo/5dHHkB4bWER+upKB4UJZXczwTWCz5\nRUZ2OdWxAgMBAAECggEANP5AVmgdL8B3V/qWTUXvnH0NOI9KvCibztuaUM9CilD1\n7ziSuAMOss8JkLlgUdaaLhlWA3ca02Wq/QLEWzxhronWFhLprLRUO3BZ0rc2RAIV\nAHUEbEgYCNekSkV9nHXuWbmHWm5G3qGEcKbm3KsiMoX2TLRmD1HT3AhXIyJ/dSm/\nmxcRjeappcYFRtzYNadfRD02dkNlT3P/5f5PSHd3ySVCkCtY24DM4Y5AWfQZxe3R\nfXj9bcTzNZIyaHYLChaXxwJBtavj7+9aehy1TTb+ygwzmeRoZ/4kpwH5mp4dZ7Um\nicA+YEVhq7QU6LO6yOTYU/AZXRFRXknv46sO25qHqQKBgQDi4whz+tbRpb+6jZHO\nsJwHo/rxEuLA0tNDY+J75qsN45eP57UU1vHCmMMt0v5y8LXLKsufmV+YgXbQavBO\nRmU0QjYFI9yAsW9RX8OvFlFYqGRDFm+c0OH9vNujdyEOfVKIEPTWKaD1ETdeYEcG\nDhKs155zr0Tm//nBabpQlQ8P6wKBgQDe1ACo8+d4JB5npeIbfSxot27Mfdk0ERgi\n6nQ9Fn/D782H2Q6vN/Rp+PJNYS3+MuYAwy8kPD7upHJDzIZgeHqlEkQniZ6rBTsB\nGO0R+E+WzoUItnkZp/a+cclyU1UjwWJ+PTlLK74l2A6oM4Q72zYUOV0h6YDG6ton\nALl6Iphl0wKBgQC0GEyca07baPrwpPFJJI0lz3cgpsIRFwgVJRMhEG9U/gRPeTgW\ny6tpsQK0vBe3uvRCybyJ+h+UmadrNod7SouI2MmyeM3N5YocCKz2rPtzKW80hXmg\n+3l3hNK/RY+axcWeNf9yg+a8wKa3piqaVs9iHWEsKMLDrgpdCYSX9EnZcwKBgFtv\n6ZlrBOgDAksMAh2/ntKVuyzE07WO8jWZufs7WVCA/fkp8+Go923pDxz7rNDr+AAG\nGDkpU7W/23fA3L+HkORd+4Ox8F9DdTP9E4NVPuumcWbi4gzKJPF/Zee5FG3otE8T\nNoiHOa7z2wfgo/mf+bAQ3gvFcuethbmNjY711U2rAoGAZBHfGPhpMIXsK+bd5Zto\nlOKs6psJfVhWUtP/NfXWzkJmQBoaDUlZS3Bp77zG0zh2KOWsP/8dp4RbffUgScbO\nZQp1bEtvgyuQO/ynwSOgcpXuv6VzdB9v80FFWqeaXyf1P/FpHykCMKMN4i9mLPC+\nbz0ENXPSH+WuYSVbQ5vYMQ0=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-jjpyn@pichulitoo-5e382.iam.gserviceaccount.com",
        "client_id": "107795792294566884915",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jjpyn%40pichulitoo-5e382.iam.gserviceaccount.com"
      }
    }
}