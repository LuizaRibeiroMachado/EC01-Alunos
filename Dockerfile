# Servidor web leve (nginx) para servir o HTML e o JavaScript do projeto
FROM nginx:alpine

# Copia os arquivos do sistema para a pasta pública do nginx
COPY index.html /usr/share/nginx/html/
COPY exercicio1 /usr/share/nginx/html/exercicio1
COPY exercicio2 /usr/share/nginx/html/exercicio2
COPY exercicio3 /usr/share/nginx/html/exercicio3
COPY exercicio4 /usr/share/nginx/html/exercicio4

EXPOSE 80
