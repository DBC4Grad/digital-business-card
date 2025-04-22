### User (사용자)
| Method Name                   | 설명                                         |
|-------------------------------|----------------------------------------------|
| createUser                    | 사용자 생성                                  |
| getUserById                   | 사용자 아이디를 통하여 사용자 조회            |
| getUserByUsername             | 사용자 이름을 통하여 사용자 조회              |
| getAllUsers                   | 모든 사용자 조회                             |
| deleteUser                    | 사용자 삭제                                  |

### Personal (개인 명함)
| Method Name                   | 설명                                         |
|-------------------------------|----------------------------------------------|
| createOrUpdatePersonalCard | 개인 명함 생성 및 수정                       |
| getPersonalCardByUser         | 사용자를 통하여 개인 명함 조회               |
| getPersonalCardByQrHash       | QR 해시값을 통하여 개인 명함 조회            |
| deletePersonalCard            | 개인 명함 삭제                               |

### Saved (타인 명함)
| Method Name                   | 설명                                         |
|-------------------------------|----------------------------------------------|
| saveCard                      | 타인 명함 저장                               |
| getAllSavedCardsByUserId      | 특정 사용자와 모든 저장된 타인 명함 조회      |
| existsBySourceQrHashAndUser   | 타인 명함 중복 여부 확인                     |
| deleteSavedCard               | 타인 명함 삭제                               |
