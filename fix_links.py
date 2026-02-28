import os
import re

dir_path = '.'

def replace_links(content):
    content = re.sub(r'href="\./"', 'href="index.html"', content)
    content = re.sub(r'href="about/"', 'href="about/index.html"', content)
    content = re.sub(r'href="works/"', 'href="works/index.html"', content)
    content = re.sub(r'href="pricing/"', 'href="pricing/index.html"', content)
    content = re.sub(r'href="news/"', 'href="news/index.html"', content)
    content = re.sub(r'href="contact/"', 'href="contact/index.html"', content)
    
    content = re.sub(r'href="\.\./"', 'href="../index.html"', content)
    content = re.sub(r'href="\.\./about/"', 'href="../about/index.html"', content)
    content = re.sub(r'href="\.\./works/"', 'href="../works/index.html"', content)
    content = re.sub(r'href="\.\./pricing/"', 'href="../pricing/index.html"', content)
    content = re.sub(r'href="\.\./news/"', 'href="../news/index.html"', content)
    content = re.sub(r'href="\.\./contact/"', 'href="../contact/index.html"', content)
    return content

for root, _, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            new_content = replace_links(content)
            if new_content != content:
                print(f"Updated {filepath}")
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
