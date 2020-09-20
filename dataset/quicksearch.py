import webbrowser
with open(input("File Name:")) as file:
    for line in file:
        webbrowser.open('http://google.com/search?q=' + line, new=2)
