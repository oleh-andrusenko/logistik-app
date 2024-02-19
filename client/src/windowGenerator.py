str = ''
for i in range(50):
    str += "{"
    str+=f'\"number\":{i+1},\"dealer\":\"dealer{i+1}\",\"direction\":\"direction{i+1}\",\"description\":\"desc{i+1}\"'
    str+="}\\\\r\\\\n"
print(str)
