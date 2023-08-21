#!/bin/bash

# Chemin du répertoire contenant les images HEIC à convertir
input_directory="/Users/yolo/Documents/dev/js/cardIn/server/images"

# Chemin du répertoire de sortie pour les images converties en WebP
output_directory="/Users/yolo/Documents/dev/js/cardIn/server/images"

# Boucle pour parcourir les fichiers HEIC dans le répertoire d'entrée
for file in "$input_directory"/*.HEIC; do
    # Récupérer le nom de fichier sans l'extension
    filename=$(basename "$file" .HEIC)
    
    # Chemin complet pour le fichier de sortie WebP
    output_file="$output_directory/$filename.jpeg"
    
    # Conversion de l'image HEIC en WebP
    magick "$file" "$output_file"
    
    # Afficher un message pour chaque image convertie
    echo "Image convertie : $output_file"
done

echo "Conversion terminée !"

