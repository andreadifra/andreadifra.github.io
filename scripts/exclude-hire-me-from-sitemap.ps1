Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$sitemapPath = Join-Path -Path $repoRoot -ChildPath '_site/sitemap.xml'

if (-not (Test-Path -LiteralPath $sitemapPath)) {
    exit 0
}

[xml]$sitemap = Get-Content -LiteralPath $sitemapPath -Raw
$namespaceManager = [System.Xml.XmlNamespaceManager]::new($sitemap.NameTable)
$namespaceManager.AddNamespace('sm', 'http://www.sitemaps.org/schemas/sitemap/0.9')

# The hire-me page is direct-link shareable, but not publicly discoverable.
$hireMeUrl = 'https://andreadifra.github.io/hire-me.html'

$changed = $false
$urlNodes = @($sitemap.SelectNodes('/sm:urlset/sm:url', $namespaceManager))

foreach ($urlNode in $urlNodes) {
    $locNode = $urlNode.SelectSingleNode('sm:loc', $namespaceManager)

    if ($null -eq $locNode) {
        continue
    }

    if ($locNode.InnerText -eq $hireMeUrl) {
        [void]$urlNode.ParentNode.RemoveChild($urlNode)
        $changed = $true
    }
}

if ($changed) {
    $writerSettings = [System.Xml.XmlWriterSettings]::new()
    $writerSettings.Encoding = [System.Text.UTF8Encoding]::new($false)
    $writerSettings.Indent = $true
    $writerSettings.NewLineChars = "`n"
    $writerSettings.NewLineHandling = [System.Xml.NewLineHandling]::Replace

    $writer = [System.Xml.XmlWriter]::Create($sitemapPath, $writerSettings)

    try {
        $sitemap.Save($writer)
    }
    finally {
        $writer.Dispose()
    }
}
